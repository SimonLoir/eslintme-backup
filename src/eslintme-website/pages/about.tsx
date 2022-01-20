import licences from '../public/licenses.json';
export default function LicencePage() {
    return (
        <div style={{ overflow: 'auto', height: '100%' }}>
            <h2>Legal information</h2>
            <p>
                <a href='https://simonloir.be'>Simon Loir</a> maintains this
                website. The goal of this website is to help developers
                configure eslint more easily. However, Simon Loir accepts no
                responsibility or liability whatsoever with regard to the
                information on this site.
            </p>
            <h3>Personal data</h3>
            <p>
                Your data is processed as mentioned in{' '}
                <a href='https://simonloir.be/rgpd'>
                    this document (in French)
                </a>
                .
            </p>
            <h2>Licences</h2>
            <p>Copyright &copy; 2021 Simon Loir - under MIT licence</p>
            <p>This website uses the following packages. </p>
            <table className='table' style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Version</th>
                        <th>Licence</th>
                    </tr>
                </thead>
                {licences.map((l, i) => (
                    <tr key={i}>
                        <td>
                            <a href={l.link.replace('git+', '')}>{l.name}</a>
                        </td>
                        <td>{l.author}</td>
                        <td>{l.installedVersion}</td>
                        <td>{l.licenseType}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
