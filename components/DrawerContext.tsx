import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { FaTimes } from "react-icons/fa"

interface DrawerOptions {
  title?: string | React.ReactNode
  onClose?: () => void
  className?: string
  contentClassName?: string
  direction?: DrawerDirection
}

type DrawerDirection = "right" | "left" | "top" | "bottom"

interface DrawerContextType {
  isOpen: boolean
  openDrawer: (content: React.ReactNode, options?: DrawerOptions) => void
  closeDrawer: () => void
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined)

interface DrawerProviderProps {
  children: React.ReactNode
}

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [drawerContent, setDrawerContent] = useState<React.ReactNode | null>(
    null
  )
  const [options, setOptions] = useState<DrawerOptions>({})

  const openDrawer = useCallback(
    (content: React.ReactNode, newOptions: DrawerOptions = {}) => {
      setDrawerContent(content)
      setOptions(newOptions)
      setIsOpen(true)
    },
    []
  )

  const closeDrawer = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      setDrawerContent(null)
      setOptions({})
    }, 300)
  }, [])

  const contextValue = useMemo(
    () => ({
      isOpen,
      openDrawer,
      closeDrawer,
    }),
    [isOpen, openDrawer, closeDrawer]
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
      <Drawer
        isOpen={isOpen}
        onClose={closeDrawer}
        title={options.title}
        direction={options.direction}
        onCloseComplete={options.onClose}
        className={options.className}
        contentClassName={options.contentClassName}
      >
        {drawerContent}
      </Drawer>
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => {
  const context = useContext(DrawerContext)
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider")
  }
  return context
}

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string | React.ReactNode
  children: React.ReactNode
  onCloseComplete?: () => void
  className?: string
  contentClassName?: string
  direction?: DrawerDirection
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title = "",
  children,
  onCloseComplete,
  className = "",
  contentClassName = "",
  direction = "right",
}) => {
  // Split the mounting state into two phases
  const [isMounted, setIsMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    let animationFrame: number
    let timeout: NodeJS.Timeout

    if (isOpen) {
      // First, mount the component
      setIsMounted(true)
      // Then trigger the animation in the next frame
      animationFrame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    } else {
      // First, start the closing animation
      setIsAnimating(false)
      // Then unmount after the animation completes
      timeout = setTimeout(() => {
        setIsMounted(false)
      }, 300) // Match this with your CSS transition duration
    }

    return () => {
      cancelAnimationFrame(animationFrame)
      clearTimeout(timeout)
    }
  }, [isOpen])

  const handleClose = useCallback((): void => {
    onClose()
    onCloseComplete?.()
  }, [onClose, onCloseComplete])

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen, handleClose])

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      // Prevent iOS Safari bounce effect
      document.documentElement.style.position = "fixed"
      document.documentElement.style.width = "100%"
      document.documentElement.style.height = "100%"
    }

    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.position = ""
      document.documentElement.style.width = ""
      document.documentElement.style.height = ""
    }
  }, [isOpen])

  const getDrawerPositionClasses = useCallback(
    (direction: DrawerDirection): string => {
      const positions = {
        right: "right-0 h-full",
        left: "left-0 h-full",
        top: "top-0 w-full",
        bottom: "bottom-0 w-full",
      }
      return positions[direction]
    },
    []
  )

  const getTransformClasses = useCallback(
    (direction: DrawerDirection): string => {
      const transforms = {
        right: `transform ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`,
        left: `transform ${
          isAnimating ? "translate-x-0" : "-translate-x-full"
        }`,
        top: `transform ${isAnimating ? "translate-y-0" : "-translate-y-full"}`,
        bottom: `transform ${
          isAnimating ? "translate-y-0" : "translate-y-full"
        }`,
      }
      return transforms[direction]
    },
    [isAnimating]
  )

  const getDrawerSizeClasses = useCallback(
    (direction: DrawerDirection): string => {
      const sizes = {
        right: "w-full",
        left: "w-full",
        top: "h-full",
        bottom: "h-full",
      }
      return sizes[direction]
    },
    []
  )

  if (!isMounted) return null

  return (
    <div
      className={`
          fixed inset-0 z-[150] flex
          transition-opacity duration-300 ease-in-out
          ${isAnimating ? "opacity-100" : "opacity-0"}
        `}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className={`
            fixed inset-0 bg-black/30 backdrop-blur-sm
            transition-opacity duration-300 ease-in-out
            ${isAnimating ? "opacity-100" : "opacity-0"}
          `}
        onClick={handleClose}
        role="button"
        tabIndex={-1}
        aria-label="Close drawer"
      />

      {/* Drawer */}
      <div
        className={`fixed bg-white shadow-xl transition-transform duration-300 ease-in-out  will-change-transform ${getDrawerPositionClasses(
          direction
        )} ${getTransformClasses(direction)} ${getDrawerSizeClasses(
          direction
        )} ${className}`}
      >
        {/* Header */}
        <div
          className={`
              flex items-center justify-between border-b px-4 py-3
              transition-opacity duration-200
              ${isAnimating ? "opacity-100" : "opacity-0"}
            `}
        >
          <button
            onClick={handleClose}
            className="p-2 rounded-full transition-colors hover:bg-gray-100"
            aria-label="Close drawer"
          >
            <FaTimes className="w-5 h-5" />
          </button>
          {typeof title === "string" ? (
            <h2 className="font-medium text-md">{title}</h2>
          ) : (
            title
          )}
          <div className="w-8" aria-hidden="true" />
        </div>

        {/* Content */}
        <div
          className={`
              h-[calc(100%-60px)] overflow-y-auto p-4
              transition-opacity duration-200 delay-75
              ${isAnimating ? "opacity-100" : "opacity-0"}
              ${contentClassName}
            `}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Drawer
