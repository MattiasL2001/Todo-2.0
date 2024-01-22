import Footer from "../components/Footer"
import Header from "../components/Header"

// Styles
const homeContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '20px',
  };

export default function Home() {
    return (
        <>
            <Header></Header>
            <div style={homeContainerStyle}>
                <h1>Home Page</h1>
                <br></br>
                <br></br>
                <h2>Here you can post your todos, so you'll never forget what to do ;)</h2>
                <h2>Click on Login to view all your todos, or click Register to create an account.</h2>
            </div>
            <Footer></Footer>
        </>
    )
}
