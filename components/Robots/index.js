import React from 'react'
import Link from 'next/link'
import styles from '../layout.module.css'

export const Robots = ({entries, onLoadMore, visibleBtn}) => {
    return (
        <>
        {entries.map(robot => (
            <Link key={robot.id} href={{pathname: "/robots/[id]", query: robot}} as={'/robots/' + robot.code}><div>{robot.code}</div></Link>
         ))}
            {visibleBtn && <button className={styles.addMoreBtn} onClick={onLoadMore}>More</button>}
    </>
    )
};
