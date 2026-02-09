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
  hit: AlgoliaHit<SearchHit>
}

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
    <div className="max-h-[400px] overflow-y-auto">
      <Hits
        hitComponent={Hit}
        classNames={{
          root: "",
          list: "space-y-0",
          item: "",
        }}
      />
    </div>
  )
}

function Hit({ hit }: HitProps) {
  return (
    <a
      href={hit.url}
      className="group flex items-start gap-3 border-b border-gray-700 px-4 py-3 transition-colors hover:bg-slate-100"
    >
      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 font-medium">
          <Highlight attribute="title" hit={hit} />
        </h3>

        {hit.description && (
          <p className="line-clamp-2 text-sm text-gray-700">
            <Highlight attribute="description" hit={hit} />
          </p>
        )}

        {/* Category badge */}
        {hit.category && (
          <span className="mt-2 inline-block rounded bg-gray-700 px-2 py-0.5 text-xs capitalize text-white">
            {hit.category}
          </span>
        )}
      </div>
    </a>
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
        <div className="relative border-b border-gray-700 px-4 py-3">
          <SearchBox
            placeholder="Search documentation..."
            autoFocus
            submitIconComponent={() => null}
            resetIconComponent={() => null}
            loadingIconComponent={() => null}
            classNames={{
              root: "relative",
              form: "relative flex items-center gap-3",
              input:
                "w-full mr-6 bg-transparent placeholder:text-gray-500 focus:outline-none",
              submit: "shrink-0",
              submitIcon: "",
              reset: "hidden",
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
