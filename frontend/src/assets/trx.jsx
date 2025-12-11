 <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-10">
    <h3 className="text-lg font-bold text-red-800">
        Campaign Title:{" "}
        <span className="text-gray-900 font-semibold">{campaignTitle}</span>
    </h3>
      <p><span className="text-gray-500 font-semibold">Requested Student:</span> {requestedStudent}</p>
      <p><span className="text-gray-500 font-semibold">Donor Name:</span> {donorName}</p>
      <p><span className="text-gray-500 font-semibold">Transaction ID:</span> {transactionId}</p>
      <p>
        <span className="text-gray-500 font-semibold">Donated Amount:</span>
        <span className="text-green-700 font-semibold">{" "}₹{donatedAmount}</span>
      </p>
      <p>
        <span className="text-gray-500 font-semibold">Donation Date:</span> 
        <span className="text-red-600 font-semibold">{" "+dayjs(donationDate).format("DD MMMM YYYY")}</span>
      </p>
      
      <p>
        <span className="text-gray-500 font-semibold">Status:</span>{" "}
        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColor()}` }>
          {status}
        </span>
      </p>
    </div>