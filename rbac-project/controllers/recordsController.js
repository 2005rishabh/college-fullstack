// Dummy data
let records = [];

exports.getAllRecords = (req, res) => {
  res.json(records);
};

exports.createRecord = (req, res) => {
  const record = req.body;
  records.push(record);
  res.json({ message: "Record created", record });
};

exports.updateRecord = (req, res) => {
  const { id } = req.params;
  records[id] = req.body;
  res.json({ message: "Record updated", record: records[id] });
};

exports.deleteRecord = (req, res) => {
  const { id } = req.params;
  records.splice(id, 1);
  res.json({ message: "Record deleted" });
};
