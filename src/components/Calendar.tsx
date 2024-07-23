"use client"

import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, ReactElement, ReactNode, ReactPortal} from 'react'
import {getStringDate} from '@/utils'

interface DataProps {
    description_long: string
    date_utc: string
    url: string
    title: string
    date_time: string
    string_date: string
    date: string
}

const CalendarEvent = () => {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const currentDate = new Date();
    const today = getStringDate(
        currentDate.getMonth() + 1,
        currentDate.getDate(),
        currentDate.getFullYear()
    );

    useEffect(() => {
        fetch(
            'https://events.brown.edu/live/json/events/description_long/true/group/Center%20for%20Computation%20and%20Visualization%20%28CCV%29/start_date/' +
            today +
            '/'
        )
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return (
        <>
            <div className="flex flex-wrap justify-between gap-4">
            {data && data.map((e: DataProps) => {
                    const descriptionLong = e.description_long.replace(/<(.|\n)*?>/g, '');
                    const dateTime =  new Date(e.date_utc.replace(/-/g, '/'));
                    const normalDate = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateTime) + ', ' + e.date
                    return (
                        <div className="bg-gray flex gap-6 overflow-hidden column item">
                            <div className="event">
                                <div className="text-neutral-900 text-sm">
                                    {normalDate}
                                </div>
                                <div>
                                    <a className="big-font font-bold text-secondary-blue-500 no-underline leading-4" href={e.url}
                                       target="_blank"> {e.title} </a>
                                </div>
                                <div className="datetime text-xs">
                                    {e.date_time}
                                </div>
                                <div className="py-2">
                                    {e.description_long &&
                                        <p>{descriptionLong}</p>
                                    }
                                </div>
                            </div>
                        </div>
                    )

                }
            )}
            </div>
        </>
    )
}

export default CalendarEvent