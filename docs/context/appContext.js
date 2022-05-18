import React, {useContext} from 'react';

export const appContext = React.createContext({
    loadingLocales: false,
    navIsVisible: false,
    hideNav: () => {},
    showNav: () => {},
})

export const useApp = (() => {
    return useContext(appContext);
});

export const AppProvider = ({value, children}) => {
    return <appContext.Provider value={value}>
        {children}
    </appContext.Provider>
}


export const withApp = (Component) => {
    return (props) => (
        <appContext.Consumer>
            {(context) => {
                return <Component context={context}  {...props} />
            }}
        </appContext.Consumer>
    )
}
