import React from 'react';
import Layout from '../components/layout';
//translations
import { useTranslation } from "react-i18next";

const Privacy = () => {
    const { t } = useTranslation();

    return (
        <Layout>
            <div className="tosCont">
                <h2 className="titleTos centerTextTos">{t('privacy.l1')}</h2>
                <p className="textTos">{t('privacy.l2-1')}<a href="https://nansystems.us">https://nansystems.us</a>&nbsp; {t('privacy.l2-2')}</p>
                <p className="textTos">{t('privacy.l3')}</p>
                <p className="textTos">{t('privacy.l4')}</p>
                <p className="textTos">{t('privacy.l5')}</p>
                <p className="textTos">{t('privacy.l6')}</p>
                <p className="textTos">{t('privacy.l7')}</p>
                <p className="textTos">{t('privacy.l8')}</p>
                <p className="textTos">{t('privacy.l9')}</p>
                <p className="textTos miniText"><a href="https://getterms.io" title="Generate a free privacy policy">{t('privacy.l10')}</a></p>
            </div>
        </Layout>
    )
}

export default Privacy;