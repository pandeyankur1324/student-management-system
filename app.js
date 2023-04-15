const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json());
const Student = require("./model/studentModel");

//Connecting to Database Mongodb
mongoose
  .connect(
    "mongodb+srv://pandeyankur55143:Zv33t85bR@cluster0.gpep0q2.mongodb.net/test",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/get-students-data", async (req, res) => {
  try {
    const data = await Student.find();
    res.status(201).json({
      status: "OK",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/create-student", async (req, res) => {
  try {
    const { name, age, contact } = req.body;
    console.log(
      `My name is ${name}\nMy age is ${age}\nMy contact number is ${contact}`
    );
    const data = await Student.create({ name, age, contact });
    res.status(201).json({
      status: "OK",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
});

app.patch("/update-students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const result = await Student.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });

    res.status(200).json({
      status: "OK",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete-student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Student.deleteOne({ _id: id });

    res.status(200).json({
      status: "OK",
      message: "Student has been deleted",
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(8000, () => {
  console.log(`Server has been started`);
});
