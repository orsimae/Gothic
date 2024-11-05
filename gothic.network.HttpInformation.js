//
// gothic.network.HttpInformation.js
//
// 𝔊𝔬𝔱𝔥𝔦𝔠 𝔖𝔠𝔯𝔦𝔭𝔱
// 𝕺𝖓𝖑𝖞 𝖆 𝖋𝖊𝖜 𝖉𝖔𝖈𝖚𝖒𝖊𝖓𝖙𝖘 𝖎𝖓 𝕲𝖔𝖙𝖍𝖎𝖈 𝖍𝖆𝖛𝖊 𝖘𝖚𝖗𝖛𝖎𝖛𝖊𝖉, 
// 𝖓𝖔𝖙 𝖊𝖓𝖔𝖚𝖌𝖍 𝖋𝖔𝖗 𝖆 𝖈𝖔𝖒𝖕𝖑𝖊𝖙𝖊 𝖗𝖊𝖈𝖔𝖓𝖘𝖙𝖗𝖚𝖈𝖙𝖎𝖔𝖓 𝖔𝖋 𝖙𝖍𝖊 
// 𝖑𝖆𝖓𝖌𝖚𝖆𝖌𝖊.  𝕸𝖔𝖘𝖙 𝕲𝖔𝖙𝖍𝖎𝖈 𝖑𝖆𝖓𝖌𝖚𝖆𝖌𝖊 𝖘𝖔𝖚𝖗𝖈𝖊𝖘 𝖆𝖗𝖊 
// 𝖙𝖗𝖆𝖓𝖘𝖑𝖆𝖙𝖎𝖔𝖓𝖘 𝖔𝖗 𝖌𝖑𝖔𝖘𝖘𝖊𝖘 𝖔𝖋 𝖔𝖙𝖍𝖊𝖗 𝖑𝖆𝖓𝖌𝖚𝖆𝖌𝖊𝖘...
//
package .gothic.network;  

/**
*
*/
static .class .HttpInformation = function()
{
 static <String> this .IP;   // Internet Protocol address
 static <String> this .ASN;  // Autonomous System Number
 static <String> this .ISP;  // Internet Service Provider
 static <String> this .CIDR; // Classless Inter-Domain Routing
 static <String> this .name;
 static <String> this .domain;
 static <String> this .country;
 static <String> this .city;
 static <Float>  this .cityLat;
 static <Float>  this .cityLong;
 
 //_________________________________________________________________________________________________
 // 
 static <Void> async function constructor()
 {
  var oRes      = await this.getMyNetwork();
  this.ASN      = oRes.data.asn;          // AS3352
  this.IP       = oRes.data.ip;           
  this.CIDR     = oRes.data.cidr;         
  
  var oRes      = await this.getGeolocByIp( this.IP );
  this.country  = oRes.data.country;      // ES
  this.city     = oRes.data.city;         // Barcelona
  this.cityLat  = oRes.data.cityLat;      // 41.3705
  this.cityLong = oRes.data.cityLong;     // 2.1627
  
  var oRes      = await this.getIspByIp( this.IP );
  this.ISP      = oRes.data.isp;          // TELEFONICA_DE_ESPANA - TELEFONICA DE ESPANA S.A.U.

  var oRes      = await this.getReverseDnsByIp( this.IP );
  this.domain   = oRes.data.domain;      // rima-tde.net
  this.name     = oRes.data.name;        // 187.red-79-152-133.dynamicip.rima-tde.net
 }
  
 //_________________________________________________________________________________________________
 // 
 static <Promise> function whatIsMyIp( ...args )
 {    
  const pCallee = gothic.lang.callee;
	 
  if ( typeof args[0] == "function" )
     return (pCallee.resolve = args[0]);
 
  // get response data
  if ( typeof args[0] == "object" ) 
  {  
   const oRaw      = args[0];
   const oData     = oRaw.data;
   const sMessage  = (oRaw.messages[0] ? oRaw.messages[0][0] +": "+ oRaw.messages[0][1] : "ok");
   const aAux      = oData.prefix.split('/');
   const oResponse = {status:oRaw.status_code, message:sMessage, service:oRaw.data_call_name,
                      data:{ip:oData.ip} };
   return pCallee.resolve( oResponse ); 
  }
   
  // set request data
  const oRequest = {}; // VOID
  return this.jsonpRequest( "https://stat.ripe.net/data/whats-my-ip/data.json", oRequest );
 } 
 
 //_________________________________________________________________________________________________
 // 
 static <Promise> function getMyNetwork( ...args )
 {   
  const pCallee = gothic.lang.callee;
	 
  if ( typeof args[0] == "function" )
     return (pCallee.resolve = args[0]);
 
  // get response data
  if ( typeof args[0] == "object" ) 
  {  
   const oRaw      = args[0];
   const oData     = oRaw.data;
   const sMessage  = (oRaw.messages[0] ? oRaw.messages[0][0] +": "+ oRaw.messages[0][1] : "ok");
   const oResponse = {status:oRaw.status_code, message:sMessage, service:oRaw.data_call_name,
                      data:{ip:oData.address, asn:"AS"+oData.asns[0], cidr:oData.prefix} };
   return pCallee.resolve( oResponse ); 
  }
  
  // set request data
  const oRequest = {}; // VOID
  return this.jsonpRequest( "https://stat.ripe.net/data/my-network-info/data.json", oRequest );
 }
 
 //_________________________________________________________________________________________________
 // 
 static <Promise> function getGeolocByIp( ...args )
 {
  const pCallee = gothic.lang.callee;
	 
  if ( typeof args[0] == "function" )
     return (pCallee.resolve = args[0]);
 
  // get response data
  if ( typeof args[0] == "object" ) 
  {  
   const oRaw      = args[0];
   const oData     = oRaw.data.located_resources[0].locations[0];
   const sMessage  = (oRaw.messages[0] ? oRaw.messages[0][0] +": "+ oRaw.messages[0][1] : "ok"); 
   const oResponse = {status:oRaw.status_code, message:sMessage, service:oRaw.data_call_name,
                      data:{country:oData.country, city:oData.city, 
                            cityLat:oData.latitude, cityLong:oData.longitude} };
   return pCallee.resolve( oResponse ); 
  }
   
  // set request data
  const oRequest = { resource:args[0] }; // IP 
  return this.jsonpRequest( "https://stat.ripe.net/data/geoloc/data.json", oRequest );  
 }

 //_________________________________________________________________________________________________
 // 
 static <Promise> function getIspByIp( ...args )
 {   
  const pCallee = gothic.lang.callee;
	 
  if ( typeof args[0] == "function" )
     return (pCallee.resolve = args[0]);
 
  // get response data
  if ( typeof args[0] == "object" ) 
  {  
   const oRaw      = args[0];
   const oData     = oRaw.data;
   const sMessage  = (oRaw.messages[0] ? oRaw.messages[0][0] +": "+ oRaw.messages[0][1] : "ok");
   const oResponse = {status:oRaw.status_code, message:sMessage, service:oRaw.data_call_name,
                      data:{isp:oData.asns[0].holder} };
   return pCallee.resolve( oResponse ); 
  }
   
  // set request data
  const oRequest = { resource:args[0] }; // IP 
  return this.jsonpRequest( "https://stat.ripe.net/data/prefix-overview/data.json", oRequest );  
 }
  
 //_________________________________________________________________________________________________
 // 
 static <Promise> function getIspByAsn( ...args )
 {   
  const pCallee = gothic.lang.callee;
	 
  if ( typeof args[0] == "function" )
     return (pCallee.resolve = args[0]);
 
  // get response data
  if ( typeof args[0] == "object" ) 
  {  
   const oRaw      = args[0];
   const oData     = oRaw.data;
   const sMessage  = (oRaw.messages[0] ? oRaw.messages[0][0] +": "+ oRaw.messages[0][1] : "ok");
   const oResponse = {status:oRaw.status_code, message:sMessage, service:oRaw.data_call_name,
                      data:{isp:oData.holder, type:oData.type,
					        block:oData.block.resource.split('-')} };
   return pCallee.resolve( oResponse ); 
  }
   
  // set request data
  const oRequest = { resource:args[0] }; // ASN
  return this.jsonpRequest( "https://stat.ripe.net/data/as-overview/data.json", oRequest );  
 }
 
 //_________________________________________________________________________________________________
 // 
 static <Promise> function getReverseDnsByIp( ...args )
 {
  const pCallee = gothic.lang.callee;
	 
  if ( typeof args[0] == "function" )
     return (pCallee.resolve = args[0]);
 
  // get response data
  if ( typeof args[0] == "object" ) 
  {  
   const oRaw      = args[0];
   const oData     = oRaw.data;
   const sMessage  = (oRaw.messages[0] ? oRaw.messages[0][0] +": "+ oRaw.messages[0][1] : 
                      (oData.error ? oData.error : ""));
   const aAux      = oData.result ? oData.result[0].split('.') : ["",""];
   const oResponse = {status:(oRaw.status_code == 200 && sMessage ? 404 : oRaw.status_code), 
                      message:sMessage||"ok", service:oRaw.data_call_name,
                      data:{domain:aAux[aAux.length-2] +'.'+ aAux[aAux.length-1],
					        name:(oData.result ? oData.result[0]:"")} };
   return pCallee.resolve( oResponse ); 
  }

  // set request data
  const oRequest = { resource:args[0] }; // IP
  return this.jsonpRequest( "https://stat.ripe.net/data/reverse-dns-ip/data.json", oRequest );    
 }
 
 //_________________________________________________________________________________________________
 // 
 static <Promise> function getForwardDnsByDomain( ...args )
 {
  const pCallee = gothic.lang.callee;
	 
  if ( typeof args[0] == "function" )
     return (pCallee.resolve = args[0]);
 
  // get response data
  if ( typeof args[0] == "object" ) 
  {  
   const oRaw      = args[0];
   const oData     = oRaw.data;
   const sMessage  = (oRaw.messages[0] ? oRaw.messages[0][0] +": "+ oRaw.messages[0][1] : "ok");
   const oResponse = {status:oRaw.status_code, message:sMessage, service:oRaw.data_call_name,
                      data:{domain:oData.a_records[0]} };
   return pCallee.resolve( oResponse ); 
  }

  // set request data
  const oRequest = { resource:args[0] }; // domain
  return this.jsonpRequest( "https://stat.ripe.net/data/forward-dns/data.json", oRequest );      
 }

 //_________________________________________________________________________________________________
 // 
 static <Promise> function jsonpRequest( sURL=String, oRequest=Object )
 { 
  const pCaller = gothic.lang.callee.caller;
 
  let   oFork = null;
  const bAsyc = ((pCaller.caller+"").indexOf("async ") == 0);
  if ( bAsyc == false )
     pCaller.resolve = pCaller.caller;	   
  else
     oFork = new Promise( pCaller );      
  
  gothic.lang.RequestJSONP( sURL, "HttpInformation."+ pCaller.name, oRequest );			  
  return (oFork);	 
 }
 
 //_________________________________________________________________________________________________
 //  
 static <Integer> function ipToInt( sIP=String ) 
 {
  return sIP.split('.').reduce( (acc, octet) => (acc << 8) + parseInt(octet), 0 );
 }

 //_________________________________________________________________________________________________
 //
 static <String> function intToIp( iIP=Integer )
 {
  return [(iIP >> 24) & 0xFF, (iIP >> 16) & 0xFF, (iIP >> 8) & 0xFF, iIP & 0xFF].join('.');
 }  
  
 //_________________________________________________________________________________________________
 //  in: "192.168.1.0/24"
 // out: { start:"192.168.1.0", end:"192.168.1.255" }
 static <Object> function cidrToRange( sCIDR=String )
 {
  const [sIP,sSubnet] = sCIDR.split('/');
  const aParts        = sIP.split('.').map(Number);
  const iSubnetMask   = parseInt( sSubnet );

  // Convert the IP parts to a single integer
  const iIP = (aParts[0] << 24) | (aParts[1] << 16) | (aParts[2] << 8) | aParts[3];

  // Calculate the network address (Start IP) and broadcast address (End IP)
  const iMask = 0xFFFFFFFF << (32 - iSubnetMask);
  const iNetworkAddress   = iIP & iMask;
  const iBroadcastAddress = iNetworkAddress | (~iMask >>> 0);

  return { start:this.intToIp(iNetworkAddress), end:this.intToIp(iBroadcastAddress) };
 }

 //_________________________________________________________________________________________________
 //  in: "192.168.1.0", "192.168.1.255"
 // out: "192.168.1.0/24"
 static <String> function rangeToCidr( sStartIP=String, sEndIP=String ) 
 {
  const iStart = this.ipToInt( sStartIP );
  const iEnd   = this.ipToInt( sEndIP );

  // Calcula la máscara de subred más grande posible que cubra el rango de direcciones
  let iMaskLength = 32;
  while ( iMaskLength > 0 && ((iStart >> (32 - iMaskLength)) !== (iEnd >> (32 - iMaskLength))) ) 
        iMaskLength--;

  // Retorna el CIDR resultante
  return (this.intToIp(iStart) +'/'+ iMaskLength);
 } 
}

/*
//
// Example 1: await
//
window.onload = async function()
{
 let oResponse = await HttpInformation.getIspByAsn( "AS3352" );
 alert( oResponse.status +' '+ oResponse.message +'\n'+ oResponse.data.isp );
}

//
// Example 2: not await
//
window.onload = function()
{
 fetchISP( null, {asn:"AS3352"} );
}

function fetchISP( oResponse, oRequest )
{
 // request
 if ( !oResponse )
    return void HttpInformation.getIspByAsn( oRequest.asn );

 // response
 alert( oResponse.status +' '+ oResponse.message +'\n'+ oResponse.data.isp );
}

//
// Example 3: not await
//
window.onload = function()
{
 fetchISP( "AS3352" )
         .then( response=>alert(response.data.isp) )
		 .catch( e=>alert(e.cause.status +" - "+ e.message) );
}

function fetchISP( sASN )
{
 const oThis = new Function();
 return function( oResponse )
 {
  if ( oResponse )
  {
   if ( typeof oThis.then == "function" && oResponse.status == 200 )  
      oThis.then( oResponse );
   else	if ( typeof oThis.catch == "function" )
      oThis.catch( new Error(oResponse.message,{cause:oResponse}) );
   return;
  }
  
  oThis.then = function( pResolve )
  {
   oThis.then = pResolve;
   return (oThis);
  };
  
  oThis.catch = function( pReject )
  {
   oThis.catch = pReject;
   return (oThis);
  };
 
  // request
  gothic.network.HttpInformation.getIspByAsn( sASN );  
  return (oThis);
 }();
}
*/
