1. 登录账号： cuihuale@163.com
   登录密码： 12345678



2. Linux 查看端口号占用并杀掉

   ```
   // 查看端口号占用
   netstat -anp|grep 3000
   
   // 确定进程号
   ps -aux| grep <进程号>
   
   // 杀掉该进程
   kill -9 <pid>
   ```

3.  git config --global hht.sslVerify "false"
