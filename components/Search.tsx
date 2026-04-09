"use client"

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch"
import {
  InstantSearch,
  SearchBox,
  Highlight,
  useInstantSearch,
  useHits,
} from "react-instantsearch"
import type { Hit as AlgoliaHit } from "instantsearch.js"
import { Link } from "./Link"
import * as React from "react"

type HitProps = {
  hit: AlgoliaHit
}

const TYPE_CONFIG: Record<string, { label: string; order: number }> = {
  page: { label: "Pages", order: 1 },
  documentation: { label: "Documentation", order: 2 },
}

const { searchClient } = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST!,
  process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY!,
  { primaryKey: "id" }
)

let timerId: ReturnType<typeof setTimeout> | undefined
const timeout = 200

function getTypeLabel(type: string): string {
  return TYPE_CONFIG[type]?.label ?? type.toUpperCase()
}

function getTypeOrder(type: string): number {
  return TYPE_CONFIG[type]?.order ?? 99
}

function GroupedHits() {
  const { items } = useHits<AlgoliaHit>()

  // Group hits by type
  const grouped = items.reduce<Record<string, AlgoliaHit[]>>((acc, hit) => {
    const type = (hit.type as string) ?? "other"
    if (!acc[type]) acc[type] = []
    acc[type].push(hit)
    return acc
  }, {})

  // Sort groups by defined order
  const sortedGroups = Object.entries(grouped).sort(
    ([a], [b]) => getTypeOrder(a) - getTypeOrder(b)
  )

  return (
    <div className="space-y-2">
      {sortedGroups.map(([type, hits]) => (
        <div key={type}>
          {/* Section header */}
          <div className="bg-white px-4 py-2">
            <span className="font-semibold uppercase tracking-wider text-slate-500">
              {getTypeLabel(type)}
            </span>
          </div>

          {/* Hits in this group */}
          <ul className="space-y-1">
            {hits.map((hit) => (
              <li key={hit.objectID}>
                <Hit hit={hit} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function SearchResults() {
  const { results, indexUiState } = useInstantSearch()
  const hasQuery = indexUiState.query && indexUiState.query.length > 0

  if (!hasQuery) {
    return (
      <div className="py-12 text-center text-sm text-slate-500">
        Start typing to search...
      </div>
    )
  }

  if (results && results.hits.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-slate-700">
          No results found for{" "}
          <span className="font-semibold">"{indexUiState.query}"</span>
        </p>
      </div>
    )
  }

  return (
    <div className="max-h-[400px] overflow-y-auto p-2">
      <GroupedHits />
    </div>
  )
}

function Hit({ hit }: HitProps) {
  const breadcrumb = (hit.breadcrumb as string[]) ?? []

  return (
    <Link
      href={hit.url as string}
      className="focus-visible:ring-ring group flex items-start gap-3 rounded-md px-4 py-3 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-400"
    >
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-xs text-slate-500">
          <Highlight attribute="title" hit={hit} />
        </p>
        {breadcrumb.length > 0 && (
          <p className="mb-1 text-lg font-medium">{breadcrumb.join(" › ")}</p>
        )}
        {hit.description && (
          <p className="line-clamp-2 text-sm text-slate-700">
            <Highlight attribute="content" hit={hit} />
          </p>
        )}
      </div>
    </Link>
  )
}

function queryHook(query: string, search: (value: string) => void) {
  if (timerId) clearTimeout(timerId)
  timerId = setTimeout(() => search(query), timeout)
}

export function Search() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="pages"
      insights={false}
    >
      <div className="flex flex-col">
        <div className="relative border-b border-slate-500 px-4 py-3">
          <SearchBox
            queryHook={queryHook}
            placeholder="Search site..."
            autoFocus
            submitIconComponent={() => null}
            resetIconComponent={() => null}
            loadingIconComponent={() => null}
            classNames={{
              root: "relative",
              form: "relative flex items-center gap-3",
              input:
                "w-full rounded-md mr-12 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-ring focus:outline-none focus-visible:ring-2 focus-visible:ring-sunglow-400 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
              submit: "hidden",
              reset: "hidden",
              loadingIndicator: "hidden",
            }}
          />
        </div>

        <SearchResults />
      </div>
    </InstantSearch>
  )
}
