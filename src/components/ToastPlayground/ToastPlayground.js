import React from "react";

import Button from "../Button";
import Toast from "../Toast";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [isToastVisible, setIsToastVisible] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const payload = { message, variant };
    console.log(payload);
    setIsToastVisible(true);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      {isToastVisible && (
        <Toast
          message={message}
          variant={variant}
          onClose={() => {
            setIsToastVisible(false);
          }}
        />
      )}
      <form className={styles.controlsWrapper} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              onInput={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              const optionId = `variant-${option}`;
              return (
                <label key={optionId} htmlFor={optionId}>
                  <input
                    id={optionId}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={option === variant}
                    onChange={(event) => {
                      setVariant(event.target.value);
                    }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={`${styles.row} ${styles.submitButtonRow}`}>
          <Button type="submit">Pop Toast!</Button>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
