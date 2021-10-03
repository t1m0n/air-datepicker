import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {useApp} from 'context/appContext';

let baseName = 'Air Datepicker';
let sep = '-';

export {baseName};

export default function usePageTitle (titleId) {
    let [pageTitle, setPageTitle] = useState();
    let {messages, locale} = useIntl();
    let {loadingLocales} = useApp();

    useEffect(() => {
        let msg = titleId ? messages[titleId] : '';
        setPageTitle(msg ? `${msg} ${sep} ${baseName}` : baseName);
    }, [titleId, loadingLocales]);


    return {
        pageTitle
    }
}
