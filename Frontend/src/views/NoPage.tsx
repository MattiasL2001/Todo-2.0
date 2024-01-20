import Footer from "../components/Footer"
import Header from "../components/Header"

// Styles
const noPageContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '20px',
  };

export default function NoPage() {
    return (
        <>
        <Header></Header>
        <div style={noPageContainerStyle}>
            <h2>Oops! Something went wrong!</h2>
        </div>
        <Footer></Footer>
        </>
    )
}
