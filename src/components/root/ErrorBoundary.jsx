
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert"
            style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Alert severity="error" style={{ padding: "100px 300px", borderRadius: "30px" }}>
                <AlertTitle>Error</AlertTitle>
                <pre>{error.message}</pre>
                <button onClick={resetErrorBoundary}
                    style={{ color: 'white', backgroundColor: 'red', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                >Login səhifəsinə qayıt</button>
            </Alert>

        </ div>
    )
}
export default ErrorFallback;