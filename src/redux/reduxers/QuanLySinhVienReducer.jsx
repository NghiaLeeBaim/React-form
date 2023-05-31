const stateDefault = {
  mangSinhVien: [
    {
      maSV: 1,
      hoTen: "Nguyen Văn A",
      soDienThoai: "090909090",
      email: "abc@gmail.com",
    },
  ],
};

export const QuanLySinhVienReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "THEM_SINH_VIEN": {
        // Them dữ liệu sinh vien vào mangSinhVien
        const mangSVUpdate=[...state.mangSinhVien,action.sinhVien]  
        state.mangSinhVien=mangSVUpdate  
        console.log(action)
    }
    default: {
      return { ...state };
    }
  }
};
