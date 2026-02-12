"use client"

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch"
import {
  Hits,
  InstantSearch,
  SearchBox,
  Highlight,
  useInstantSearch,
} from "react-instantsearch"
import type { Hit as AlgoliaHit } from "instantsearch.js"
import { Link } from "./Link"
import { X } from "lucide-react"
import * as React from "react"
import { urlToBreadcrumb } from "@/lib/utils"

interface SearchHit {
  id: string
  title: string
  description: string
  content: string
  headings: string[]
  url: string
  category: string
  type: string
}

type HitProps = {
  hit: AlgoliaHit
}

// For the debounce
let timerId: string | number | NodeJS.Timeout | undefined = undefined
let timeout = 200

function SearchResults() {
  const { results, indexUiState } = useInstantSearch()
  const hasQuery = indexUiState.query && indexUiState.query.length > 0

  if (!hasQuery) {
    return (
      <div className="py-12 text-center text-sm text-gray-500">
        Start typing to search...
      </div>
    )
  }

  if (results && results.hits.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-gray-700">
          No results found for{" "}
          <span className="font-semibold">"{indexUiState.query}"</span>
        </p>
      </div>
    )
  }

  return (
    <div className="max-h-[400px] overflow-y-auto p-2">
      <Hits
        hitComponent={Hit}
        classNames={{
          root: "",
          list: "space-y-2",
          item: "",
        }}
      />
    </div>
  )
}

function Hit({ hit }: HitProps) {
  return (
    <Link
      href={hit.url}
      className="focus-visible:ring-ring group flex items-start gap-3 rounded-md px-4 py-3 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-400"
    >
      {/* Content */}
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-xs text-gray-500">{urlToBreadcrumb(hit.url)}</p>
        <h3 className="mb-1 font-medium">
          <Highlight attribute="title" hit={hit} />
        </h3>

        {hit.description && (
          <p className="line-clamp-2 text-sm text-gray-700">
            <Highlight attribute="description" hit={hit} />
          </p>
        )}
      </div>
    </Link>
  )
}

export function Search() {
  const { searchClient } = instantMeiliSearch(
    process.env.NEXT_PUBLIC_MEILISEARCH_HOST!,
    process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY!,
    {
      primaryKey: "id",
    }
  )

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="pages"
      insights={false}
    >
      <div className="flex flex-col">
        {/* Search Input */}
        <div className="relative border-b border-gray-500 px-4 py-3">
          <SearchBox
            queryHook={queryHook}
            placeholder="Search documentation..."
            autoFocus
            submitIconComponent={() => null}
            resetIconComponent={() => <X className="h-4 w-4" />}
            loadingIconComponent={() => null}
            classNames={{
              root: "relative",
              form: "relative flex items-center gap-3",
              input:
                "w-full rounded-md mr-6 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-400 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
              submit: "hidden",
              submitIcon: "",
              reset:
                "absolute rounded-sm right-8 top-1/2 -translate-y-1/2 cursor-pointer focus-visible:outline-none focus-visible:ring-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-400",
              resetIcon: "text-gray-400",
              loadingIndicator: "hidden",
            }}
          />
        </div>

        {/* Results */}
        <SearchResults />
      </div>
    </InstantSearch>
  )
}

function queryHook(query: string, search: (value: string) => void) {
  if (timerId) {
    clearTimeout(timerId)
  }

  timerId = setTimeout(() => search(query), timeout)
}
