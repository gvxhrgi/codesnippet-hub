import { Search } from 'lucide-react'
import React from 'react'

function Catalog() {
    return (
        <section className='catalog-section'>
            <section className='controls-section'>
                <div className="controls-container">
                    <div className="search-box">
                        <Search />
                        <input type="text" id="catalogSearch" placeholder="Search filenames, tags, or languages..." aria-label="Search code snippets" />
                    </div>
                    <div className="filter-group">
                        {/* <button className="filter-btn active" data-filter="all">All</button> */}
                    </div>
                </div>
            </section>
            <div className="snippets-grid" id='snippetsGrid'>
            </div>
        </section>
    )
}

export default Catalog