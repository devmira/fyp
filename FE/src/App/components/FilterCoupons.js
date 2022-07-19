import { RegionDropdown } from "react-country-region-selector";
import { sectionList } from "../../utils/services.js";
import React from "react";
import { Row, Form } from "react-bootstrap";

const FilterCoupons = ({ coupons, setFilteredCoupons }) => {
  const [region, setRegion] = React.useState("");
  const [section, setSection] = React.useState("");
  const updateList = (type, value) => {
    const filter = {};
    if (type === "city") {
      filter.city = value;
      filter.section = section;
    } else {
      filter.city = region;
      filter.section = value;
    }
    const newList = coupons.filter(function (item) {
      if (
        filter.city !== "" &&
        filter.section !== "" &&
        item.section === filter.section &&
        item.city === filter.city
      ) {
        return true;
      } else if (
        filter.city !== "" &&
        filter.section === "" &&
        item.city === filter.city
      ) {
        return true;
      } else if (
        filter.section !== "" &&
        filter.city === "" &&
        item.section === filter.section
      ) {
        return true;
      } else if (filter.city === "" && filter.section === "") {
        return true;
      } else {
        return false;
      }
    });
    setFilteredCoupons(newList);
  };
  return (
    <Row style={{ marginBottom: "20px", justifyContent: "center" }}>
      <RegionDropdown
        name="city"
        country="Malaysia"
        value={region}
        style={{
          marginRight: "10px",
          background: "#f4f7fa",
          borderRadius: "15px",
          width: "35%",
          color: "#495057",
          border: "1px solid #ced4da",
          padding: "10px 20px",
        }}
        onChange={(val) => {
          setRegion(val);
          updateList("city", val);
        }}
      />
      <Form.Control
        as="select"
        value={section}
        style={{ width: "35%", borderRadius: "15px" }}
        name="section"
        onChange={(e) => {
          setSection(e.target.value);
          updateList("section", e.target.value);
        }}
      >
        <option key="all" value="">
          Select Section
        </option>
        {sectionList.map((sec) => {
          return <option key={sec}>{sec}</option>;
        })}
      </Form.Control>
    </Row>
  );
};

export default FilterCoupons;
