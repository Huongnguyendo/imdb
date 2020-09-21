import React from "react";
import {
  Navbar,
  Form,
  FormControl,
  NavDropdown,
  Button,
  Nav,
  Dropdown,
} from "react-bootstrap";
import InputRange from "react-input-range";


const Navigation = ({
  getMovieLatest,
  searchByKeyword,
  searchByTopRated,
  getMoviesByGenre,
  sortByRate,
  sortByPopular,
  filterByRate,
  rate,
}) => {
  let keyword = "";
  return (
    <div>
      <Navbar expand="lg" className="navbar-movie" variant="dark">
        <Navbar.Brand href="#home" onClick={() => getMovieLatest()} >MovieBox</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features" onClick={() => searchByTopRated()}>
              Top rated
            </Nav.Link>

            
            
            <NavDropdown
              className="d-flex flex-row-reverse"
              title="Sort By"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => sortByRate("desc")}>
                Rating (high to low)
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => sortByPopular("desc")}>
                Popularity (high to low)
              </NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown
              className="d-flex flex-row-reverse filter-dropdown"
              title="Filter By"
              id="collasible-nav-dropdown"
            >
              
              <NavDropdown.Item>
              <div className="input-range" style={{ color: "white", width: "100%", marginTop: "20px", height: "40px"}}>
                <InputRange
                  maxValue={10}
                  minValue={0}
                  value={rate}
                  // filter movies on change
                  onChange={(value) => filterByRate(value)}
                />
              </div>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              className="d-flex flex-row-reverse"
              title="Genres"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => getMoviesByGenre("")}>
                All
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => getMoviesByGenre("28")}>
                Action
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => getMoviesByGenre("16")}>
                Animation
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => getMoviesByGenre("35")}>
                Comedy
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => getMoviesByGenre("80")}>
                Crime
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => getMoviesByGenre("99")}>
                Documentary
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => getMoviesByGenre("18")}>
                Drama
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => getMoviesByGenre("14")}>
                Fantasy
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => getMoviesByGenre("36")}>
                History
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => getMoviesByGenre("27")}>
                Horror
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => getMoviesByGenre("878")}>
                Science Fiction
              </NavDropdown.Item>
              
            </NavDropdown>

          </Nav>
          <Form
            inline
            onSubmit={(event) => {
              event.preventDefault();
              searchByKeyword(keyword);
            }}
          >
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={(event) => {
                keyword = event.target.value;
                console.log("keyword", keyword);
              }}
            />
            <Button variant="dark" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
