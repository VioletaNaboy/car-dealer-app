'use client'
import { useState, useEffect } from "react"
import Link from "next/link"

import { Make } from "../components/DropDownEl"
import { fetchMakesAndYear } from "../actions/getMakesAndYear"
import { DropDownEl } from "../components/DropDownEl"



export default function FilterPage() {
    const [make, setMake] = useState<number>()
    const [year, setYear] = useState<number>()
    const [makes, setMakes] = useState<Make[]>([]);
    const [years, setYears] = useState<number[]>([]);
    useEffect(() => {
        fetchMakesAndYear().then(({ makes, years }) => {
            setMakes(makes)
            setYears(years)
        });
    }, [])
    const handleSelectYear = (y: number) => { setYear(y) }
    const handleSelectMake = (m: number) => { setMake(m) }

    return (
        <>
            <div>
                <DropDownEl array={makes} title='makes' func={handleSelectMake} />
                <DropDownEl array={years} title='years' func={handleSelectYear} />
            </div>
            <Link href={make && year ? `/results/${make}/${year}` : '#'}>Next</Link>
        </>
    )
}