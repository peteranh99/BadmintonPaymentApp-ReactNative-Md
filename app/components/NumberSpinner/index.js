import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import InputSpinner from "react-native-input-spinner";

export default function NumberSpinner(props) {
    const { value, ...rest } = props;
    return (
        <InputSpinner
            style={styles.container}
            height={40}
            value={value}
            skin="clean"
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: 125,
        maxWidth: 150,
    },
});
