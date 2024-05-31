import React, { useEffect, useState } from "react";
import BasicInputDateRange from "../../components/DateRange/BasicInputDateRange";
import InventoryData from "../../../src/data/inventory.json";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import CustomModal from "../../components/Modal/CustomModal";
import { DeleteIcon, ViewIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmationModal from "../../components/Modal/ConfirmationModal/ConfirmationModal";
import Alert from "../../components/Alert/Alert";
import TableContent from "../../components/Modal/ModalContent/ModelContentTypes/TableContent";
import FormContent from "../../components/Modal/ModalContent/ModelContentTypes/FormContent";
import CopyToClipboard from "../../components/Clipboard/CopyToClipboard";
import "./home.css";

const headers = [
  { label: "Challan Number", key: "challanNumber" },
  { label: "Company Challan Number", key: "companyChallanNumber" },
  { label: "Toli Number", key: "toliNumber" },
  { label: "Product Name", key: "productName" },
  { label: "Truck Number", key: "truckNumber" },
  { label: "Location Name", key: "locationName" },
  { label: "Source Party Name", key: "sourcePartyName" },
  { label: "Destination Party Name", key: "destinationName" },
  { label: "Quantity", key: "quantity" },
  { label: "Freight", key: "freight" },
  { label: "Advance", key: "advance" },
  { label: "Remark", key: "remark" },
];

function Home() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(InventoryData);
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
    setAlertMessage("Item deleted successfully.");
    setIsAlertVisible(true);
  };

  const handleAlertClose = () => {
    // Hide alert message
    setIsAlertVisible(false);
  };

  const columns = [
    {
      name: "Challan Number",
      selector: (row) => row.challanNumber,
      sortable: true,
      reorder: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.productName,
      sortable: true,
      reorder: true,
    },
    {
      name: "Truck Number",
      selector: (row) => row.truckNumber,
      sortable: true,
      reorder: true,
    },
    {
      name: "Source Party Name",
      selector: (row) => row.sourcePartyName,
      sortable: true,
      reorder: true,
    },
    {
      name: "Destination Party Name",
      selector: (row) => row.destinationName,
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
    const result = InventoryData.filter((row) => {
      return row.challanNumber.toLowerCase().includes(search.toLowerCase());
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
            data={InventoryData}
            headers={headers}
            filename={"inventory-movement-history.csv"}
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
          <BasicInputDateRange />
          <button className="btn btn-filter">Search</button>
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

export default Home;
