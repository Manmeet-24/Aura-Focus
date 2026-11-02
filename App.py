import streamlit as st
import pandas as pd

st.set_page_config(page_title="AuraFocus Telemetry", layout="wide")
st.title("AuraFocus: Real-Time Focus Telemetry Dashboard")

def fetch_focus_logs():
    return pd.DataFrame({
        "Timestamp": ["10:00 AM", "10:15 AM", "10:45 AM"],
        "Page_Title": ["Python Documentation", "YouTube", "Finance Masterclass"],
        "AI_Classification": ["PRODUCTIVE", "DISTRACTED", "DISTRACTED"],
        "HITL_Override": [False, False, True]
    })

data = fetch_focus_logs()
st.dataframe(data, use_container_width=True)

st.subheader("Model Drift & False Positives")
st.warning("Zero-shot false positives are routed back to the Gemini 2.5 Flash prompt as few-shot examples.")
