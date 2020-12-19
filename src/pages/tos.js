import React from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';

const Tos = () => {
    return (
        <Layout>
            <div className="tosCont">
                <h2 className="titleTos centerTextTos">Website Terms and Conditions of Use</h2>
                <h3 className="subtitleTos">1. Terms</h3>
                <p className="textTos">By accessing this Website, accessible from https://nansystems.us, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>
                <h3 className="subtitleTos">2. Use License</h3>
                <p className="textTos">Permission is granted to temporarily download one copy of the materials on NaNSYSTEMS's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="textTos">
                    <li>modify or copy the materials;</li>
                    <li>use the materials for any commercial purpose or for any public display;</li>
                    <li>attempt to reverse engineer any software contained on NaNSYSTEMS's Website;</li>
                    <li>remove any copyright or other proprietary notations from the materials; or</li>
                    <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
                </ul>
                <p className="textTos miniText">This will let NaNSYSTEMS to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format. These Terms of Service has been created with the help of the <a href="https://www.termsofservicegenerator.net">Terms Of Service Generator</a> and the <a href="https://www.generateprivacypolicy.com">Privacy Policy Generator</a>.</p>
                <h3 className="subtitleTos">3. Disclaimer</h3>
                <p className="textTos">All the materials on NaNSYSTEMS’s Website are provided "as is". NaNSYSTEMS makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, NaNSYSTEMS does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>
                <h3 className="subtitleTos">4. Limitations</h3>
                <p className="textTos">NaNSYSTEMS or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on NaNSYSTEMS’s Website, even if NaNSYSTEMS or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</p>
                <h3 className="subtitleTos">5. Revisions and Errata</h3>
                <p className="textTos">The materials appearing on NaNSYSTEMS’s Website may include technical, typographical, or photographic errors. NaNSYSTEMS will not promise that any of the materials in this Website are accurate, complete, or current. NaNSYSTEMS may change the materials contained on its Website at any time without notice. NaNSYSTEMS does not make any commitment to update the materials.</p>
                <h3 className="subtitleTos">6. Links</h3>
                <p className="textTos">NaNSYSTEMS has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by NaNSYSTEMS of the site. The use of any linked website is at the user’s own risk.</p>
                <h3 className="subtitleTos">7. Site Terms of Use Modifications</h3>
                <p className="textTos">NaNSYSTEMS may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</p>
                <h3 className="subtitleTos">8. Your Privacy</h3>
                <p className="textTos">Please read our <Link to="/privacy">Privacy Policy</Link>.</p>
                <h3 className="subtitleTos">9. Governing Law</h3>
                <p className="textTos">Any claim related to NaNSYSTEMS's Website shall be governed by the laws of us without regards to its conflict of law provisions.</p>
            </div>
        </Layout>
    )
}

export default Tos;