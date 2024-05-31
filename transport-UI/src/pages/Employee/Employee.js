import React, { useEffect, useState } from "react";
import EmployeeData from "../../../src/data/employee.json";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import CustomModal from "../../components/Modal/CustomModal";
import { DeleteIcon, ViewIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmationModal from "../../components/Modal/ConfirmationModal/ConfirmationModal";
import Alert from "../../components/Alert/Alert";
import TableContent from "../../components/Modal/ModalContent/ModelContentTypes/TableContent";
import FormContent from "../../components/Modal/ModalContent/ModelContentTypes/FormContent";
import CopyToClipboard from "../../components/Clipboard/CopyToClipboard";
import { AddIcon } from "@chakra-ui/icons";
import "./Employee.css";

const headers = [
  { label: "Id", key: "id" },
  { label: "Employee Code", key: "employeeCode" },
  { label: "Full Name", key: "fullName" },
  { label: "Email", key: "email" },
  { label: "Phone Number", key: "phoneNumber" },
  { label: "Department", key: "department" },
  { label: "Designation", key: "designation" },
  { label: "Hiring Date", key: "hireDate" },
  { label: "Salary", key: "salary" },
  { label: "Created At", key: "createdAt" },
  { label: "Created By", key: "createdBy" },
  { label: "Updated At", key: "updatedAt" },
  { label: "Updated By", key: "updatedBy" },
];

function Employee() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(EmployeeData);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openViewModal = (row) => {
    setIsViewOpen(true);
    setSelectedRow(row);
  };

  const closeViewModal = () => {
    setIsViewOpen(false);
    setSelectedRow(null);
  };

  const openEditModal = (row) => {
    setIsEditOpen(true);
    setSelectedRow(row);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setSelectedRow(null);
  };

  const openDeleteModal = (row) => {
    setIsDeleteOpen(true);
    setSelectedRow(row);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedRow(null);
  };

  const onConfirm = () => {
    console.log("onConfirm");
    closeDeleteModal();
    // Show success alert
    setAlertType("success");
    setAlertMessage("Employee deleted successfully.");
    setIsAlertVisible(true);
  };

  const handleAlertClose = () => {
    // Hide alert message
    setIsAlertVisible(false);
  };

  const columns = [
    {
      name: "Employee Code",
      selector: (row) => row.employeeCode,
      sortable: true,
      reorder: true,
    },
    {
      name: "Employee Name",
      selector: (row) => row.fullName,
      sortable: true,
      reorder: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
      reorder: true,
    },
    {
      name: "Salary",
      selector: (row) => row.salary,
      sortable: true,
      reorder: true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      reorder: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="table-actions">
          <ViewIcon
            onClick={() => openViewModal(row)}
            color="#2793c0"
            className="action-icon"
          />
          <EditIcon
            onClick={() => openEditModal(row)}
            color="#f05f5f"
            className="action-icon"
          />
          <DeleteIcon
            onClick={() => openDeleteModal(row)}
            color="#f05f5f"
            className="action-icon"
          />
        </div>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "#202124",
        fontSize: "18px",
      },
    },
    rows: {
      style: {
        fontSize: "16px",
        fontWeight: 400,
        color: "black",
        backgroundColor: "white",
        minHeight: "48px",
      },
      highlightOnHoverStyle: {
        backgroundColor: "rgb(230, 244, 244)",
        borderBottomColor: "#FFFFFF",
        outline: "1px solid #FFFFFF",
      },
    },
  };

  const ExpandedComponent = ({ data }) => (
    <div className="expanded-component">
      <div className="copy-clipboard">
        <CopyToClipboard content={JSON.stringify(data, null, 2)} />
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <style jsx>{`
        .expanded-component {
          background-color: #f9f9f9;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
          max-width: 600px;
          overflow-x: auto;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-top: 10px;
          margin-left: 10px;
          margin-bottom: 10px;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .copy-clipboard {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );

  useEffect(() => {
    const result = EmployeeData.filter((row) => {
      return row.fullName.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search]);

  return (
    <div className="home-container">
      {isAlertVisible && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={handleAlertClose}
        />
      )}
      <div className="home-top-section">
        <div className="left-side">
          <CSVLink
            data={EmployeeData}
            headers={headers}
            filename={"employee.csv"}
          >
            <button className="btn active">Export data</button>
          </CSVLink>
          <div>
            <CustomModal
              isOpen={isViewOpen}
              onClose={closeViewModal}
              selectedRow={selectedRow}
              ModalContent={TableContent}
            />
            <CustomModal
              isOpen={isEditOpen}
              onClose={closeEditModal}
              selectedRow={selectedRow}
              ModalContent={FormContent}
            />
            <ConfirmationModal
              isOpen={isDeleteOpen}
              onDecline={closeDeleteModal}
              onConfirm={onConfirm}
              selectedRow={selectedRow}
            />
          </div>
        </div>
        <div className="right-side">
          <button className="btn btn-add">
            Add <AddIcon marginLeft="10px" />
          </button>
        </div>
      </div>
      <div className="table-container">
        <DataTable
          columns={columns}
          data={filteredData}
          highlightOnHover
          pointerOnHover
          pagination
          selectableRowsSingle
          expandableRows
          expandOnRowClicked
          expandableRowsComponent={ExpandedComponent}
          customStyles={customStyles}
          subHeader
          subHeaderAlign="right"
          subHeaderComponent={
            <input
              type="search"
              className="search-filter"
              placeholder="Filter data"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          }
        />
      </div>
    </div>
  );
}

export default Employee;
