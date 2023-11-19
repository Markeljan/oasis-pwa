"use client"

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export function ToastProvider() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={true}
            draggable={true}
            pauseOnHover={true}
        />
    );
}