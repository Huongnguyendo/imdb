import React from "react";
import InputRange from "react-input-range";
import { Dropdown } from "react-bootstrap";
export default function FilterBoard({
  sortByRate,
  sortByPopular,
  filterByYear,
  filterByRating,
  year,
  rate,
}) {
  return (
    <div style={{ width: "100%" }}>
      <Dropdown style={{ width: "100%" }}>
        <Dropdown.Toggle
          variant="danger"
          id="dropdown-basic"
          style={{ width: "100%" }}
        >
          Sort By
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ width: "100%" }}>
          <Dropdown.Item
            href="#/action-1"
            onClick={() => sortByRate("desc")}
            style={{ width: "100%" }}
          >
            Rating(high to low)
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            onClick={() => sortByRate("asc")}
            style={{ width: "100%" }}
          >
            Rating (low to high)
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-3"
            onClick={() => sortByPopular("desc")}
            style={{ width: "100%" }}
          >
            popularity(high to low)
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-3"
            onClick={() => sortByPopular("asc")}
            style={{ width: "100%" }}
          >
            popularity(low to high)
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
      <div className="input-range">
        <p>Rating: </p>
        <div style={{ color: "white", width: "40%" }}>
          <p>Year:</p>
          <InputRange
            maxValue={2020}
            minValue={1980}
            value={year}
            onChange={(value) => {console.log(value); filterByYear(value)}}
          />
        </div>
        <div style={{ color: "white", width: "40%"}}>
          <p>Rating: </p>
          <InputRange
            maxValue={10}
            minValue={0}
            value={rate}
            onChange={(value) => {console.log(value); filterByRating(value)}}
          />
        </div>
      </div>
    </div>
  );
}