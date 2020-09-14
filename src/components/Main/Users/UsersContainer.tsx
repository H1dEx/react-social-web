import React, {Component} from "react";
import {connect} from "react-redux";
import {requestUsers, setCurrentPage, unfollow, followThunk} from "../../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import {withAuthRedirect} from "../../../hoc/AuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSuper
} from "../../../redux/usersSelectors";
import {UserType} from "../../../types/types";
import {AppStateType} from "../../../redux/reduxStore";

type PropsType = {
    isFetching: boolean
    followingInProgress: Array<number>
    currentPage: number
    pageSize: number
    totalUsersCount: number
    users: Array<UserType>
    followThunk: Function
    unfollow: Function
    requestUsers: (pageSize: number, pageNumber: number)=>void
    setCurrentPage: (pageNumber: number) => void

}

class UsersContainer extends Component<PropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.pageSize, this.props.currentPage);
    };
    
    onPageChange = (p: number) => {
        this.props.setCurrentPage(p);
        this.props.requestUsers(this.props.pageSize, p);
    };
    
    render() {
        return (
            <> {this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       onPageChange={this.onPageChange}
                       follow={this.props.followThunk}
                       unfollow={this.props.unfollow}
                       followingInProgress={this.props.followingInProgress}
                />
            </>)
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsersSuper(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

export default compose(connect(mapStateToProps, {
    followThunk,
    unfollow,
    setCurrentPage,
    requestUsers,
}), withAuthRedirect)(UsersContainer);


