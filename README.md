use local strategy on login
validate function email/password

user (email,password) => token (id, refreshtoken, user_id) 
registerAsync
(Crypto + Token) => AuthLibModule

jwt strategy (refresh, access)
refreshToken(7d) [cookie] + accessToken(30m) [header]
loin, register, logout, me (param decorator)