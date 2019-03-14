export const   checkTel=(rule, value, callback)=>{
  if (!value) {
    callback(new Error('请输入手机号'));
  } else {
    let  myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(value)) {
      return  callback(new Error('手机号码格式不正确'));
    }
    return callback();
  }
}
