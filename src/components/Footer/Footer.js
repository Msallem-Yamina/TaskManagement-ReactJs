import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-center text-white py-3" >
            <p>Created By 
                <i><strong>Yamina Msallem</strong></i>.
                 Copyright &copy; {currentYear}
            </p>
        </footer>

    )
}

export default Footer;