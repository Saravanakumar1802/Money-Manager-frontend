import { Button, Card, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from '../Api';

export function IncEdit() {

    const { id } = useParams();
    const [inc, setInc] = useState(null);

    useEffect(() => {
        fetch(`${API}/income/${id}`, { method: "GET" })
            .then((data) => data.json())
            .then((ex) => setInc(ex));
    }, [id]);

    return (
        <div>
            {inc ? <EditInc inc={inc} /> : "Loading!!!"}
        </div>
    )
}

export function EditInc({ inc }) {
  
    const [date, setDate] = useState(inc.Incdate);
    const [incdesc, setIncDesc] = useState(inc.incdesc);
    const [amount, setAmount] = useState(inc.Incamount);

    const navigate = useNavigate();

    const editIncome = () => {
        const updatedInc = {
            Incdate: date,
            incdesc: incdesc,
            Incamount: amount
        };
        editInc(updatedInc);
    };

    const editInc = (updatedInc) => {

        fetch(`${API}/income/${inc._id}`, {
            method: "PUT",
            body: JSON.stringify(updatedInc),
            headers: { "Content-type": "application/json" },
        }).then(() => navigate("/main"));
    };

    return (
        <div className="edit-card">
            <Card className="addexp-form ">
                <h2>Edit Income</h2>
                <TextField label="" variant="outlined" type={"date"}
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                />
                <TextField label="Income Description" variant="outlined"
                    value={incdesc}
                    onChange={(event) => setIncDesc(event.target.value)}
                />
                <TextField label="Enter Amount" variant="outlined"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                />
                <Button variant="contained" onClick={editIncome}>Submit</Button>
            </Card>
        </div>
    )
}