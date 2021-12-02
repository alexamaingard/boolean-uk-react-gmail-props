import { useState } from 'react'

import '../styles/emails.css'

import initialEmails from '../data/emails'

import Email from './email'

const getReadEmails = emails => emails.filter(email => !email.read);

const getStarredEmails = emails => emails.filter(email => email.starred);

const Emails = () => {
    const [emails, setEmails] = useState(initialEmails);
    const [hideRead, setHideRead] = useState(false);
    const [currentTab, setCurrentTab] = useState('inbox');

    const unreadEmails = emails.filter(email => !email.read);
    const starredEmails = emails.filter(email => email.starred);

    const toggleRead = targetEmail => {
        const updatedEmails = emails =>
                emails.map(email =>
                    email.id === targetEmail.id ? { ...email, read: !email.read } : email
            );
            setEmails(updatedEmails);
    }

    const toggleStar = targetEmail => {
        const updatedEmails = emails =>
            emails.map(email =>
                email.id === targetEmail.id ? { ...email, starred: !email.starred } : email
            );
        setEmails(updatedEmails);
    }

    const handleChange = event => {
        event.preventDefault();
        const updatedEmails = emails =>
            emails.filter(email =>
                email.title.toLowerCase().includes(searchBar.value.toLowerCase())
            );
        if (!searchBar.value) {
            return setEmails(initialEmails);
        }
        setEmails(updatedEmails);
    }
    
    const handleSubmit = event => {
        handleChange(event);
    }

    let filteredEmails = emails;

    if (hideRead) {
        filteredEmails = getReadEmails(filteredEmails);
    }
    if (currentTab === 'starred'){
        filteredEmails = getStarredEmails(filteredEmails);
    }

    return (
        <div className="app">
            <header className="header">
                <div className="left-menu">
                    <svg className="menu-icon" focusable="false" viewBox="0 0 24 24">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                    </svg>
        
                    <img
                        src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
                        alt="gmail logo"
                    />
                </div>
                <form className="search" onChange={handleChange} onSubmit={handleSubmit}>
                        <input 
                            className="search-bar"
                            id = "searchBar" 
                            placeholder="Search mail"
                            type="text"
                        />
                </form>
            </header>
            <nav className="left-menu">
                <ul className="inbox-list">
                    <li
                        className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
                        onClick={() => setCurrentTab('inbox')}
                    >
                        <span className="label">Inbox</span>
                        <span className="count">{unreadEmails.length}</span>
                    </li>
                    <li
                    className={`item ${currentTab === 'starred' ? 'active' : ''}`}
                    onClick={() => setCurrentTab('starred')}
                    >
                        <span className="label">Starred</span>
                        <span className="count">{starredEmails.length}</span>
                    </li>

                    <li className="item toggle">
                        <label htmlFor="hide-read">Hide read</label>
                        <input
                            id="hide-read"
                            type="checkbox"
                            checked={hideRead}
                            onChange={event => setHideRead(event.target.checked)}
                        />
                    </li>
                </ul>
            </nav>
            <main className="emails">
                <ul>
                    {filteredEmails.map((email, index) => (
                        <Email 
                            email={email} 
                            index={index} 
                            toggleRead={toggleRead} 
                            toggleStar={toggleStar}
                        />
                    ))}
                </ul>
            </main>
        </div>
    )
}

export default Emails