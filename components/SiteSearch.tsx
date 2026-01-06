import SearchInput from "@/components/SearchInput"
import React, { useState } from "react"
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
  StyledDialogTrigger,
} from "@/components/StyledDialog"
import { Button } from "@/components/button/Button"
import { FaMagnifyingGlass } from "react-icons/fa6"

const SiteSearch: React.FC = ({}) => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  return (
    <StyledDialog onOpenChange={() => setSearchQuery("")}>
      <StyledDialogTrigger asChild>
        <Button
          variant="icon_only"
          iconOnly={<FaMagnifyingGlass />}
          className="bg-red-university text-white"
        />
      </StyledDialogTrigger>
      <StyledDialogContent className="bg-white">
        <StyledDialogTitle>Search CCV</StyledDialogTitle>
        <SearchInput onSearchChange={(val) => setSearchQuery(val)} />
        <p>{searchQuery}</p>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default SiteSearch
