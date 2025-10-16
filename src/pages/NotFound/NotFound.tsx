import React from "react";
import Page from "../../components/layout/Page/Page";
import Text from "../../components/common/Text/Text";
import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <Page>
            <div style={{ paddingTop: 24 }}>
                <Text as="h2" textSize={5} boldness="bold">Page not found</Text>
                <Text muted>The page you are looking for doesn’t exist.</Text>
                <div style={{ height: 16 }} />
                <Button onClick={() => navigate("/")}>Go to Dashboard</Button>
            </div>
        </Page>
    );
}


