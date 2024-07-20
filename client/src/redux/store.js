// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
// import rootReducer from './reducers/index';
// import {composeWithDevTools} from 'redux-devtools-extension';

// const  composeEnhancer = composeWithDevTools();
// const store = createStore(rootReducer, composeEnhancer);


// const DataProvider = ({children}) => {
//     return (
//         <Provider store={store}>
//             {children}
//         </Provider>
//     )
// }

// export default DataProvider;

import {configureStore} from '@reduxjs/toolkit';

import rootReducer from './reducers/index';

const store = configureStore({
    reducer: rootReducer
});

export default store;