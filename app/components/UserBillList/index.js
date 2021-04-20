import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Helper from "../../commons/Helper";
import Pricing from "../../commons/Pricing";
import { getBillCock, getBillOtherPrice } from "../../store/slices/billSettingSlice";
import {
    getPlayingTimes,
    removeUserByUsername,
    selectAllUser,
} from "../../store/slices/usersSlice";
import UserBill from "../UserBill";
import UserModal from "../UserModal";

export default function UserBillList(props) {
    const dispatch = useDispatch();

    const users = useSelector(selectAllUser);
    const totalCock = useSelector(getBillCock);
    const playingTimes = useSelector(getPlayingTimes);
    const billOtherPrice = useSelector(getBillOtherPrice);
    const avgBillOtherPrice = billOtherPrice / users.length;
    // state
    const [modalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    //

    const userCockPayments = Pricing.getUserCockPayments(totalCock, users);
    const userPlayingTimePayments = Pricing.getPlayingTimePayments(
        playingTimes
    );

    const onLongPressHandler = (item) => {
        dispatch(removeUserByUsername(item.username));
    };

    return (
        <View>
            {users.length > 0
                ? users.map((item) => (
                      <UserBill
                          onLongPress={onLongPressHandler.bind(this, item)}
                          onPress={() => {
                              setModalVisible(true);
                              setCurrentUser(item);
                          }}
                          key={item.username}
                          user={item}
                          userCockPayment={userCockPayments[item.username]}
                          avgBillOtherPrice={avgBillOtherPrice}
                          userPlayingTimePayment={
                              userPlayingTimePayments[item.playingTime]
                          }
                      />
                  ))
                : null}
            {currentUser ? (
                <UserModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    user={currentUser}
                    users={users}
                />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});
