import Icon from "@/components/ui/RenderIcon"
import { Input } from "@/components/ui/Input"
import React, { useState } from "react"

interface SearchInputProps {
  placeholder?: string
  name: string
  onSearchChange: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  name,
  onSearchChange,
}) => {
  const [query, setQuery] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setQuery(newValue)
    onSearchChange(newValue)
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon iconName="FaSearch" className="h-4 w-4" />
      </div>
      <Input
        type="search"
        name={name}
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="block w-full rounded-lg border-none bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus-visible:ring-0 [&::-ms-clear]:hidden [&::-webkit-search-cancel-button]:hidden"
      />
    </div>
  )
}

export default SearchInput
