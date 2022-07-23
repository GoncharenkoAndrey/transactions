import React from "react";
import {connect} from "react-redux";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import {setFilterAction} from "../../reducers/filter";
import "./Filter.css";

function Filter({filter, setFilter}) {

    const FilterToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            className="statusFilterToggle"
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
          {children}
          &#x25bc;
        </a>
    ));

    function onChangeStatusFilter(key, event) {
        const filterValue = event.target.innerText;
        setFilter({statusFilter: filterValue});
    };

    function onChangeTypeFilter(key, event) {
        const filterValue = event.target.innerText;
        setFilter({typeFilter: filterValue});
    };

    return (
        <div className = "filterContainer">
            <Dropdown className = "statusFilter" as = {ButtonGroup} onSelect = {onChangeStatusFilter}>
                <Dropdown.Toggle id = "status-filter" as = {FilterToggle}>Status</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey = "1">All</Dropdown.Item>
                    <Dropdown.Item eventKey = "2">Pending</Dropdown.Item>
                    <Dropdown.Item eventKey = "3">Completed</Dropdown.Item>
                    <Dropdown.Item eventKey = "4">Cancelled</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={ButtonGroup} onSelect = {onChangeTypeFilter}>
                <Dropdown.Toggle id = "type-filter" as = {FilterToggle}>Type</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey = "1">All</Dropdown.Item>
                    <Dropdown.Item eventKey = "2">Refill</Dropdown.Item>
                    <Dropdown.Item eventKey = "3">Withdrawal</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setFilter: (filter) => dispatch(setFilterAction(filter))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);