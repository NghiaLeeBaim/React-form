import React, { Component } from "react";
import { connect } from "react-redux";

class FormSinhVien extends Component {
  state = {
    values: {
      maSV: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
    },
    errors: {
      maSV: "",
      hoTen: "",
      email: "",
      soDienThoai: "",
    },
    valid: false,
  };

  handleChange = (e) => {
    // Lấy giá trị mỗi lần input thay đổi bởi người dùng
    let targetInput = e.target;
    let { name, value, type, pattern } = targetInput;

    let errorMessage = "";
    // Kiểm tra rỗng
    if (value.trim() === "") {
      // kiểm tra bất kỳ input nào đều kiểm tra rỗng
      errorMessage = name + " không được bỏ trống";
    }

    // kiểm tra email
    if (type === "email") {
      const regex = new RegExp(pattern);

      if (!regex.test(value)) {
        errorMessage = name + " không đúng định dạng";
      }
    }
    // kiểm tra số điện thoại
    if (name === "soDienThoai") {
      const regex = new RegExp(pattern);

      if (!regex.test(value)) {
        errorMessage = name + " không đúng định dạng";
      }
    }

    // Cập nhập giá trị cho value
    let values = { ...this.state.values, [name]: value };
    // Cập nhập lỗi cho state
    let errors = { ...this.state.errors, [name]: errorMessage };

    this.setState(
      {
        ...this.state,
        values: values,
        errors: errors,
      },
      () => {
        console.log(this.state);
        this.checkValid();
      }
    );
  };

  handleSubmit = (e) => {
    // Cản sự reload lại trang
    e.preventDefault();
    this.props.themSinhVien(this.state.values);
  };

  checkValid = () => {
    let valid = true;
    for (let key in this.state.errors) {
      if (this.state.errors[key] !== "" || this.state.values[key]==="") {
        valid = false;
      }
    }
    this.setState({
      ...this.state,
      valid: valid,
    });

    return (
      <button type="submit" className="btn btn-success mt-3" disabled>
        Thêm Sinh Viên
      </button>
    );
  };

  render() {
    return (
      <div className="container">
        <div className="card text-left">
          <div className="card-header bg-dark text-white">
            <h3>Thông tin sinh viên</h3>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="form-group col-6">
                  <span>Mã SV</span>
                  <input
                    className="form-control"
                    name="maSV"
                    value={this.state.values.maSV}
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.maSV}</p>
                </div>
                <div className="form-group col-6">
                  <span>Họ tên</span>
                  <input
                    className="form-control"
                    name="hoTen"
                    value={this.state.values.hoTen}
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.hoTen}</p>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <span>Số điện thoại</span>
                  <input
                    type="text"
                    pattern="^(0|[1-9][0-9]*)$"
                    className="form-control"
                    name="soDienThoai"
                    value={this.state.values.soDienThoai}
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.soDienThoai}</p>
                </div>
                <div className="form-group col-6">
                  <span>Email</span>
                  <input
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    className="form-control"
                    name="email"
                    value={this.state.values.email}
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.email}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {this.state.valid ? (
                    <button className="btn btn-success" type="submit">
                      Thêm Sinh Viên
                    </button>
                  ) : (
                    <button className="btn btn-success" type="submit" disabled>
                      Thêm Sinh Viên
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    themSinhVien: (sinhVien) => {
      const action = {
        type: "THEM_SINH_VIEN",
        sinhVien,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(FormSinhVien);
