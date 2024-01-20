import Footer from "../components/Footer"
import Header from "../components/Header"

// Styles
const homeContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '20px',
    // color: '#fff',
  };

export default function Home() {
    return (
        <>
            <Header></Header>
            <div style={homeContainerStyle}>
                <h2>Todo Website</h2>
                <br></br>
                <br></br>
                <p>Here you can post your todos, so you'll never forget what to do ;)</p>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <p>some text</p>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <p>some more text</p>
            </div>
            <Footer></Footer>
        </>
    )
}
