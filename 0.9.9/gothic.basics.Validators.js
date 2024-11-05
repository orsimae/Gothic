//
// gothic.basics.Validators.js
//
// 𝔊𝔬𝔱𝔥𝔦𝔠 𝔖𝔠𝔯𝔦𝔭𝔱
// 𝕺𝖓𝖑𝖞 𝖆 𝖋𝖊𝖜 𝖉𝖔𝖈𝖚𝖒𝖊𝖓𝖙𝖘 𝖎𝖓 𝕲𝖔𝖙𝖍𝖎𝖈 𝖍𝖆𝖛𝖊 𝖘𝖚𝖗𝖛𝖎𝖛𝖊𝖉, 
// 𝖓𝖔𝖙 𝖊𝖓𝖔𝖚𝖌𝖍 𝖋𝖔𝖗 𝖆 𝖈𝖔𝖒𝖕𝖑𝖊𝖙𝖊 𝖗𝖊𝖈𝖔𝖓𝖘𝖙𝖗𝖚𝖈𝖙𝖎𝖔𝖓 𝖔𝖋 𝖙𝖍𝖊 
// 𝖑𝖆𝖓𝖌𝖚𝖆𝖌𝖊.  𝕸𝖔𝖘𝖙 𝕲𝖔𝖙𝖍𝖎𝖈 𝖑𝖆𝖓𝖌𝖚𝖆𝖌𝖊 𝖘𝖔𝖚𝖗𝖈𝖊𝖘 𝖆𝖗𝖊 
// 𝖙𝖗𝖆𝖓𝖘𝖑𝖆𝖙𝖎𝖔𝖓𝖘 𝖔𝖗 𝖌𝖑𝖔𝖘𝖘𝖊𝖘 𝖔𝖋 𝖔𝖙𝖍𝖊𝖗 𝖑𝖆𝖓𝖌𝖚𝖆𝖌𝖊𝖘...
//
package .gothic.basics;

/**
*
*/
static .class .Validators = function()
{
 //_______________________________________________________________________________________
 //
 static <Void> function constructor()
 {
  Global.empty       = -0;
  Global.ⵁ           = Global.empty;
  Global.isEmpty     = this.isEmptyGlobal;
  Global.isUndefined = this.isUndefinedGlobal;
  Global.typeOf      = this.typeOfGlobal;
  Error.isValid      = this.isValidError;
  String.isValid     = this.isValidString;
  Number.isValid     = this.isValidNumber;
  Number.typeOf      = this.typeOfNumber;
  Function.typeOf    = this.typeOfFunction;
  Iterator.typeOf    = this.typeOfIterator;
 }
 
 //_______________________________________________________________________________________
 // 
 private <Boolean> function isEmptyGlobal( v=Number )
 {
  return Object.is(-0,v);
 }

 //_______________________________________________________________________________________
 // 
 private <Boolean> function isUndefinedGlobal( v=Variant )
 {
  return (v == undefined || Number.isNaN(v));
 }
 
 //_______________________________________________________________________________________
 // 
 private <Boolean> function typeOfGlobal( v=Variant )
 {
  if ( Global.isUndefined(v) ) 
     return "Undefined";	
 
  if ( Number.isValid(v) ) 
     return Number.typeOf(v); 	

  return Function.typeOf( v.constructor );
 }

 //_______________________________________________________________________________________
 // 
 private <Boolean> function isValidString( v=Variant )
 {
  return (v != undefined && v.constructor == String);
 }
 
 //_______________________________________________________________________________________
 // Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError
 private <Boolean> function isValidError( v=Variant )
 {
  return (v != undefined && 
          Object.prototype.toString.call(v).match(/\s(.+)\]/)[1] == "Error");
 }
   
 //_______________________________________________________________________________________
 //
 private <Boolean> function isValidNumber( v=Variant )
 {
  return (v != undefined && !Number.isNaN(v) && 
          (v.constructor == Number || v.constructor == BigInt));
 }
 
 //_______________________________________________________________________________________
 //
 private <Boolean> function typeOfNumber( v=Variant )
 {
  if ( v == undefined || Number.isNaN(v) ||
       (v.constructor != Number && v.constructor != BigInt) )
     return ("");
	
  if ( typeof v == "bigint" ) 
     return ("BigInt");
 
  if ( typeof v == "object" ) 
     return ("Number"); 
   
  if ( Number.isInteger(v) ) 
     return ("Integer");
	
  return ("Float");
 }

 //_______________________________________________________________________________________
 //
 private <Boolean> function typeOfFunction( v=Variant )
 {
  if ( typeof v != "function" ) return ("");
  
  if ( !v.prototype ) 
     return ("Arrow");
  
  if ( Function.prototype.toString.call(v).startsWith("class ") )
     return ("Class");
  
  if ( !v.name || v.name == "anonymous" ) 
     return ("Anonymous");
  
  return (v.name);
 }

 //_______________________________________________________________________________________
 // 
 private <Boolean> function typeOfIterator( v=Variant )
 {
  if ( v == undefined || v.constructor != Iterator ) return ("");	 
  return Object.prototype.toString.call(v).match(/\s(.+)\s/)[1];
 }

 //_______________________________________________________________________________________
 // In verify
 global <Void> function iverify( Void )
 {
  const pCaller  = arguments.callee.caller;
  const aValues  = pCaller.arguments;
  const aTypes   = pCaller.toString().match(/\((.*)\)/)[1].replace(/\s/g,'').split(',');
  const aNumbers = ["BigInt","Number","Float","Integer"];
  var   sType    = "";
  var   aTuple   = null;
 
  for ( var idx = 0, len = aTypes.length; idx < len; idx++ )
  {
   aTuple = aTypes[idx].split('=');
   if ( !aTuple[1] ) aTuple[1] = aTuple[0];
   if ( Global.isUndefined(aValues[idx]) || aTuple[1] == "Variant" ) continue;
   
   sType = Global.typeOf( aValues[idx] );
  
   if ( (aTuple[1] == "Number" && !aNumbers.includes(sType)) || aTuple[1] != sType )
      GothicScript.crash( "argument '"+ aTuple[0] +"' not is a '"+ aTuple[1] );
  }
 }
 
 //_______________________________________________________________________________________
 // Out verify
 global <Void> function overify( Void )
 {
 }
}