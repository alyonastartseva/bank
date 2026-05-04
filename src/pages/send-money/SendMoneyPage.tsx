import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import styles from "./SendMoneyPage.module.css";

const recipients = [
  { id: 1, name: "Yamilet", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Alexa", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Yakub", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Krishna", avatar: "https://i.pravatar.cc/150?img=4" },
];

export default function SendMoneyPage() {
  const [amount, setAmount] = useState("36.00");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(null);

  return (
    <Box className={styles.page}>
      {}
      <Typography className={styles.pageTitle}>Send Money</Typography>

      {}
      <Box className={styles.cardForm}>
        <Typography className={styles.cardTitle}>Card Details</Typography>
        <TextField
          fullWidth
          label="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          margin="normal"
          placeholder="4562 1122 4595 7852"
        />
        <TextField
          fullWidth
          label="Cardholder Name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          margin="normal"
          placeholder="Jonson"
        />
        <Box className={styles.row}>
          <TextField
            label="Expiry (MM/YY)"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="24/2000"
            className={styles.halfField}
          />
          <TextField
            label="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="698"
            className={styles.halfField}
          />
        </Box>
      </Box>

      {/* Блок получателей */}
      <Box className={styles.recipientsSection}>
        <Box className={styles.recipientsHeader}>
          <Typography className={styles.recipientsTitle}>Send to</Typography>
          <Button className={styles.addButton}>Add</Button>
        </Box>
        <Box className={styles.recipientsList}>
          {recipients.map((recipient) => (
            <Box
              key={recipient.id}
              className={`${styles.recipientItem} ${selectedRecipient === recipient.id ? styles.selected : ""}`}
              onClick={() => setSelectedRecipient(recipient.id)}
            >
              <Avatar src={recipient.avatar} className={styles.avatar} />
              <Typography className={styles.recipientName}>{recipient.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {}
      <Box className={styles.amountSection}>
        <Typography className={styles.amountLabel}>Enter Your Amount</Typography>
        <TextField
          className={styles.amountInput}
          value={`USD ${amount}`}
          onChange={(e) => {
            const raw = e.target.value.replace(/^USD\s*/, "");
            setAmount(raw);
          }}
          variant="outlined"
        />
        <Button className={styles.changeCurrency}>Change Currency?</Button>
      </Box>

      {/* Кнопка отправки */}
      <Button className={styles.sendButton}>Send Money</Button>
    </Box>
  );
}