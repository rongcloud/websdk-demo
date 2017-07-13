(function(global){"use strict";function loadByteBuffer(Long){var ByteBuffer=function(capacity,littleEndian,noAssert){if(typeof capacity==='undefined')capacity=ByteBuffer.DEFAULT_CAPACITY;if(typeof littleEndian==='undefined')littleEndian=ByteBuffer.DEFAULT_ENDIAN;if(typeof noAssert==='undefined')noAssert=ByteBuffer.DEFAULT_NOASSERT;if(!noAssert){capacity=capacity|0;if(capacity<0)
throw RangeError("Illegal capacity");littleEndian=!!littleEndian;noAssert=!!noAssert;}
this.buffer=capacity===0?EMPTY_BUFFER:new ArrayBuffer(capacity);this.view=capacity===0?null:new DataView(this.buffer);this.offset=0;this.markedOffset=-1;this.limit=capacity;this.littleEndian=typeof littleEndian!=='undefined'?!!littleEndian:false;this.noAssert=!!noAssert;};ByteBuffer.VERSION="3.5.5";ByteBuffer.LITTLE_ENDIAN=true;ByteBuffer.BIG_ENDIAN=false;ByteBuffer.DEFAULT_CAPACITY=16;ByteBuffer.DEFAULT_ENDIAN=ByteBuffer.BIG_ENDIAN;ByteBuffer.DEFAULT_NOASSERT=false;ByteBuffer.Long=Long||null;var ByteBufferPrototype=ByteBuffer.prototype;var EMPTY_BUFFER=new ArrayBuffer(0);var stringFromCharCode=String.fromCharCode;function stringSource(s){var i=0;return function(){return i<s.length?s.charCodeAt(i++):null;};}
function stringDestination(){var cs=[],ps=[];return function(){if(arguments.length===0)
return ps.join('')+stringFromCharCode.apply(String,cs);if(cs.length+arguments.length>1024)
ps.push(stringFromCharCode.apply(String,cs)),cs.length=0;Array.prototype.push.apply(cs,arguments);};}
ByteBuffer.allocate=function(capacity,littleEndian,noAssert){return new ByteBuffer(capacity,littleEndian,noAssert);};ByteBuffer.concat=function(buffers,encoding,littleEndian,noAssert){if(typeof encoding==='boolean'||typeof encoding!=='string'){noAssert=littleEndian;littleEndian=encoding;encoding=undefined;}
var capacity=0;for(var i=0,k=buffers.length,length;i<k;++i){if(!ByteBuffer.isByteBuffer(buffers[i]))
buffers[i]=ByteBuffer.wrap(buffers[i],encoding);length=buffers[i].limit-buffers[i].offset;if(length>0)capacity+=length;}
if(capacity===0)
return new ByteBuffer(0,littleEndian,noAssert);var bb=new ByteBuffer(capacity,littleEndian,noAssert),bi;var view=new Uint8Array(bb.buffer);i=0;while(i<k){bi=buffers[i++];length=bi.limit-bi.offset;if(length<=0)continue;view.set(new Uint8Array(bi.buffer).subarray(bi.offset,bi.limit),bb.offset);bb.offset+=length;}
bb.limit=bb.offset;bb.offset=0;return bb;};ByteBuffer.isByteBuffer=function(bb){return(bb&&bb instanceof ByteBuffer)===true;};ByteBuffer.type=function(){return ArrayBuffer;};ByteBuffer.wrap=function(buffer,encoding,littleEndian,noAssert){if(typeof encoding!=='string'){noAssert=littleEndian;littleEndian=encoding;encoding=undefined;}
if(typeof buffer==='string'){if(typeof encoding==='undefined')
encoding="utf8";switch(encoding){case"base64":return ByteBuffer.fromBase64(buffer,littleEndian);case"hex":return ByteBuffer.fromHex(buffer,littleEndian);case"binary":return ByteBuffer.fromBinary(buffer,littleEndian);case"utf8":return ByteBuffer.fromUTF8(buffer,littleEndian);case"debug":return ByteBuffer.fromDebug(buffer,littleEndian);default:throw Error("Unsupported encoding: "+encoding);}}
if(buffer===null||typeof buffer!=='object')
throw TypeError("Illegal buffer");var bb;if(ByteBuffer.isByteBuffer(buffer)){bb=ByteBufferPrototype.clone.call(buffer);bb.markedOffset=-1;return bb;}
if(buffer instanceof Uint8Array){bb=new ByteBuffer(0,littleEndian,noAssert);if(buffer.length>0){bb.buffer=buffer.buffer;bb.offset=buffer.byteOffset;bb.limit=buffer.byteOffset+buffer.length;bb.view=buffer.length>0?new DataView(buffer.buffer):null;}}else if(buffer instanceof ArrayBuffer){bb=new ByteBuffer(0,littleEndian,noAssert);if(buffer.byteLength>0){bb.buffer=buffer;bb.offset=0;bb.limit=buffer.byteLength;bb.view=buffer.byteLength>0?new DataView(buffer):null;}}else if(Object.prototype.toString.call(buffer)==="[object Array]"){bb=new ByteBuffer(buffer.length,littleEndian,noAssert);bb.limit=buffer.length;for(i=0;i<buffer.length;++i)
bb.view.setUint8(i,buffer[i]);}else
throw TypeError("Illegal buffer");return bb;};ByteBufferPrototype.writeInt8=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value|=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
offset+=1;var capacity0=this.buffer.byteLength;if(offset>capacity0)
this.resize((capacity0*=2)>offset?capacity0:offset);offset-=1;this.view.setInt8(offset,value);if(relative)this.offset+=1;return this;};ByteBufferPrototype.writeByte=ByteBufferPrototype.writeInt8;ByteBufferPrototype.readInt8=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+1>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);}
var value=this.view.getInt8(offset);if(relative)this.offset+=1;return value;};ByteBufferPrototype.readByte=ByteBufferPrototype.readInt8;ByteBufferPrototype.writeUint8=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value>>>=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
offset+=1;var capacity1=this.buffer.byteLength;if(offset>capacity1)
this.resize((capacity1*=2)>offset?capacity1:offset);offset-=1;this.view.setUint8(offset,value);if(relative)this.offset+=1;return this;};ByteBufferPrototype.readUint8=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+1>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);}
var value=this.view.getUint8(offset);if(relative)this.offset+=1;return value;};ByteBufferPrototype.writeInt16=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value|=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
offset+=2;var capacity2=this.buffer.byteLength;if(offset>capacity2)
this.resize((capacity2*=2)>offset?capacity2:offset);offset-=2;this.view.setInt16(offset,value,this.littleEndian);if(relative)this.offset+=2;return this;};ByteBufferPrototype.writeShort=ByteBufferPrototype.writeInt16;ByteBufferPrototype.readInt16=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+2>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength);}
var value=this.view.getInt16(offset,this.littleEndian);if(relative)this.offset+=2;return value;};ByteBufferPrototype.readShort=ByteBufferPrototype.readInt16;ByteBufferPrototype.writeUint16=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value>>>=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
offset+=2;var capacity3=this.buffer.byteLength;if(offset>capacity3)
this.resize((capacity3*=2)>offset?capacity3:offset);offset-=2;this.view.setUint16(offset,value,this.littleEndian);if(relative)this.offset+=2;return this;};ByteBufferPrototype.readUint16=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+2>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength);}
var value=this.view.getUint16(offset,this.littleEndian);if(relative)this.offset+=2;return value;};ByteBufferPrototype.writeInt32=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value|=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
offset+=4;var capacity4=this.buffer.byteLength;if(offset>capacity4)
this.resize((capacity4*=2)>offset?capacity4:offset);offset-=4;this.view.setInt32(offset,value,this.littleEndian);if(relative)this.offset+=4;return this;};ByteBufferPrototype.writeInt=ByteBufferPrototype.writeInt32;ByteBufferPrototype.readInt32=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+4>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);}
var value=this.view.getInt32(offset,this.littleEndian);if(relative)this.offset+=4;return value;};ByteBufferPrototype.readInt=ByteBufferPrototype.readInt32;ByteBufferPrototype.writeUint32=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value>>>=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
offset+=4;var capacity5=this.buffer.byteLength;if(offset>capacity5)
this.resize((capacity5*=2)>offset?capacity5:offset);offset-=4;this.view.setUint32(offset,value,this.littleEndian);if(relative)this.offset+=4;return this;};ByteBufferPrototype.readUint32=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+4>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);}
var value=this.view.getUint32(offset,this.littleEndian);if(relative)this.offset+=4;return value;};if(Long){ByteBufferPrototype.writeInt64=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value==='number')
value=Long.fromNumber(value);else if(typeof value==='string')
value=Long.fromString(value);else if(!(value&&value instanceof Long))
throw TypeError("Illegal value: "+value+" (not an integer or Long)");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
if(typeof value==='number')
value=Long.fromNumber(value);else if(typeof value==='string')
value=Long.fromString(value);offset+=8;var capacity6=this.buffer.byteLength;if(offset>capacity6)
this.resize((capacity6*=2)>offset?capacity6:offset);offset-=8;if(this.littleEndian){this.view.setInt32(offset,value.low,true);this.view.setInt32(offset+4,value.high,true);}else{this.view.setInt32(offset,value.high,false);this.view.setInt32(offset+4,value.low,false);}
if(relative)this.offset+=8;return this;};ByteBufferPrototype.writeLong=ByteBufferPrototype.writeInt64;ByteBufferPrototype.readInt64=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+8>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);}
var value=this.littleEndian?new Long(this.view.getInt32(offset,true),this.view.getInt32(offset+4,true),false):new Long(this.view.getInt32(offset+4,false),this.view.getInt32(offset,false),false);if(relative)this.offset+=8;return value;};ByteBufferPrototype.readLong=ByteBufferPrototype.readInt64;ByteBufferPrototype.writeUint64=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value==='number')
value=Long.fromNumber(value);else if(typeof value==='string')
value=Long.fromString(value);else if(!(value&&value instanceof Long))
throw TypeError("Illegal value: "+value+" (not an integer or Long)");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
if(typeof value==='number')
value=Long.fromNumber(value);else if(typeof value==='string')
value=Long.fromString(value);offset+=8;var capacity7=this.buffer.byteLength;if(offset>capacity7)
this.resize((capacity7*=2)>offset?capacity7:offset);offset-=8;if(this.littleEndian){this.view.setInt32(offset,value.low,true);this.view.setInt32(offset+4,value.high,true);}else{this.view.setInt32(offset,value.high,false);this.view.setInt32(offset+4,value.low,false);}
if(relative)this.offset+=8;return this;};ByteBufferPrototype.readUint64=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+8>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);}
var value=this.littleEndian?new Long(this.view.getInt32(offset,true),this.view.getInt32(offset+4,true),true):new Long(this.view.getInt32(offset+4,false),this.view.getInt32(offset,false),true);if(relative)this.offset+=8;return value;};}
ByteBufferPrototype.writeFloat32=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number')
throw TypeError("Illegal value: "+value+" (not a number)");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
offset+=4;var capacity8=this.buffer.byteLength;if(offset>capacity8)
this.resize((capacity8*=2)>offset?capacity8:offset);offset-=4;this.view.setFloat32(offset,value,this.littleEndian);if(relative)this.offset+=4;return this;};ByteBufferPrototype.writeFloat=ByteBufferPrototype.writeFloat32;ByteBufferPrototype.readFloat32=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+4>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);}
var value=this.view.getFloat32(offset,this.littleEndian);if(relative)this.offset+=4;return value;};ByteBufferPrototype.readFloat=ByteBufferPrototype.readFloat32;ByteBufferPrototype.writeFloat64=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number')
throw TypeError("Illegal value: "+value+" (not a number)");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
offset+=8;var capacity9=this.buffer.byteLength;if(offset>capacity9)
this.resize((capacity9*=2)>offset?capacity9:offset);offset-=8;this.view.setFloat64(offset,value,this.littleEndian);if(relative)this.offset+=8;return this;};ByteBufferPrototype.writeDouble=ByteBufferPrototype.writeFloat64;ByteBufferPrototype.readFloat64=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+8>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);}
var value=this.view.getFloat64(offset,this.littleEndian);if(relative)this.offset+=8;return value;};ByteBufferPrototype.readDouble=ByteBufferPrototype.readFloat64;ByteBuffer.MAX_VARINT32_BYTES=5;ByteBuffer.calculateVarint32=function(value){value=value>>>0;if(value<1<<7)return 1;else if(value<1<<14)return 2;else if(value<1<<21)return 3;else if(value<1<<28)return 4;else return 5;};ByteBuffer.zigZagEncode32=function(n){return(((n|=0)<<1)^(n>>31))>>>0;};ByteBuffer.zigZagDecode32=function(n){return((n>>>1)^-(n&1))|0;};ByteBufferPrototype.writeVarint32=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value|=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
var size=ByteBuffer.calculateVarint32(value),b;offset+=size;var capacity10=this.buffer.byteLength;if(offset>capacity10)
this.resize((capacity10*=2)>offset?capacity10:offset);offset-=size;this.view.setUint8(offset,b=value|0x80);value>>>=0;if(value>=1<<7){b=(value>>7)|0x80;this.view.setUint8(offset+1,b);if(value>=1<<14){b=(value>>14)|0x80;this.view.setUint8(offset+2,b);if(value>=1<<21){b=(value>>21)|0x80;this.view.setUint8(offset+3,b);if(value>=1<<28){this.view.setUint8(offset+4,(value>>28)&0x0F);size=5;}else{this.view.setUint8(offset+3,b&0x7F);size=4;}}else{this.view.setUint8(offset+2,b&0x7F);size=3;}}else{this.view.setUint8(offset+1,b&0x7F);size=2;}}else{this.view.setUint8(offset,b&0x7F);size=1;}
if(relative){this.offset+=size;return this;}
return size;};ByteBufferPrototype.writeVarint32ZigZag=function(value,offset){return this.writeVarint32(ByteBuffer.zigZagEncode32(value),offset);};ByteBufferPrototype.readVarint32=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+1>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);}
var size=0,value=0>>>0,temp,ioffset;do{ioffset=offset+size;if(!this.noAssert&&ioffset>this.limit){var err=Error("Truncated");err['truncated']=true;throw err;}
temp=this.view.getUint8(ioffset);if(size<5)
value|=((temp&0x7F)<<(7*size))>>>0;++size;}while((temp&0x80)===0x80);value=value|0;if(relative){this.offset+=size;return value;}
return{"value":value,"length":size};};ByteBufferPrototype.readVarint32ZigZag=function(offset){var val=this.readVarint32(offset);if(typeof val==='object')
val["value"]=ByteBuffer.zigZagDecode32(val["value"]);else
val=ByteBuffer.zigZagDecode32(val);return val;};if(Long){ByteBuffer.MAX_VARINT64_BYTES=10;ByteBuffer.calculateVarint64=function(value){if(typeof value==='number')
value=Long.fromNumber(value);else if(typeof value==='string')
value=Long.fromString(value);var part0=value.toInt()>>>0,part1=value.shiftRightUnsigned(28).toInt()>>>0,part2=value.shiftRightUnsigned(56).toInt()>>>0;if(part2==0){if(part1==0){if(part0<1<<14)
return part0<1<<7?1:2;else
return part0<1<<21?3:4;}else{if(part1<1<<14)
return part1<1<<7?5:6;else
return part1<1<<21?7:8;}}else
return part2<1<<7?9:10;};ByteBuffer.zigZagEncode64=function(value){if(typeof value==='number')
value=Long.fromNumber(value,false);else if(typeof value==='string')
value=Long.fromString(value,false);else if(value.unsigned!==false)value=value.toSigned();return value.shiftLeft(1).xor(value.shiftRight(63)).toUnsigned();};ByteBuffer.zigZagDecode64=function(value){if(typeof value==='number')
value=Long.fromNumber(value,false);else if(typeof value==='string')
value=Long.fromString(value,false);else if(value.unsigned!==false)value=value.toSigned();return value.shiftRightUnsigned(1).xor(value.and(Long.ONE).toSigned().negate()).toSigned();};ByteBufferPrototype.writeVarint64=function(value,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof value==='number')
value=Long.fromNumber(value);else if(typeof value==='string')
value=Long.fromString(value);else if(!(value&&value instanceof Long))
throw TypeError("Illegal value: "+value+" (not an integer or Long)");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
if(typeof value==='number')
value=Long.fromNumber(value,false);else if(typeof value==='string')
value=Long.fromString(value,false);else if(value.unsigned!==false)value=value.toSigned();var size=ByteBuffer.calculateVarint64(value),part0=value.toInt()>>>0,part1=value.shiftRightUnsigned(28).toInt()>>>0,part2=value.shiftRightUnsigned(56).toInt()>>>0;offset+=size;var capacity11=this.buffer.byteLength;if(offset>capacity11)
this.resize((capacity11*=2)>offset?capacity11:offset);offset-=size;switch(size){case 10:this.view.setUint8(offset+9,(part2>>>7)&0x01);case 9:this.view.setUint8(offset+8,size!==9?(part2)|0x80:(part2)&0x7F);case 8:this.view.setUint8(offset+7,size!==8?(part1>>>21)|0x80:(part1>>>21)&0x7F);case 7:this.view.setUint8(offset+6,size!==7?(part1>>>14)|0x80:(part1>>>14)&0x7F);case 6:this.view.setUint8(offset+5,size!==6?(part1>>>7)|0x80:(part1>>>7)&0x7F);case 5:this.view.setUint8(offset+4,size!==5?(part1)|0x80:(part1)&0x7F);case 4:this.view.setUint8(offset+3,size!==4?(part0>>>21)|0x80:(part0>>>21)&0x7F);case 3:this.view.setUint8(offset+2,size!==3?(part0>>>14)|0x80:(part0>>>14)&0x7F);case 2:this.view.setUint8(offset+1,size!==2?(part0>>>7)|0x80:(part0>>>7)&0x7F);case 1:this.view.setUint8(offset,size!==1?(part0)|0x80:(part0)&0x7F);}
if(relative){this.offset+=size;return this;}else{return size;}};ByteBufferPrototype.writeVarint64ZigZag=function(value,offset){return this.writeVarint64(ByteBuffer.zigZagEncode64(value),offset);};ByteBufferPrototype.readVarint64=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+1>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);}
var start=offset,part0=0,part1=0,part2=0,b=0;b=this.view.getUint8(offset++);part0=(b&0x7F);if(b&0x80){b=this.view.getUint8(offset++);part0|=(b&0x7F)<<7;if(b&0x80){b=this.view.getUint8(offset++);part0|=(b&0x7F)<<14;if(b&0x80){b=this.view.getUint8(offset++);part0|=(b&0x7F)<<21;if(b&0x80){b=this.view.getUint8(offset++);part1=(b&0x7F);if(b&0x80){b=this.view.getUint8(offset++);part1|=(b&0x7F)<<7;if(b&0x80){b=this.view.getUint8(offset++);part1|=(b&0x7F)<<14;if(b&0x80){b=this.view.getUint8(offset++);part1|=(b&0x7F)<<21;if(b&0x80){b=this.view.getUint8(offset++);part2=(b&0x7F);if(b&0x80){b=this.view.getUint8(offset++);part2|=(b&0x7F)<<7;if(b&0x80){throw Error("Buffer overrun");}}}}}}}}}}
var value=Long.fromBits(part0|(part1<<28),(part1>>>4)|(part2)<<24,false);if(relative){this.offset=offset;return value;}else{return{'value':value,'length':offset-start};}};ByteBufferPrototype.readVarint64ZigZag=function(offset){var val=this.readVarint64(offset);if(val&&val['value']instanceof Long)
val["value"]=ByteBuffer.zigZagDecode64(val["value"]);else
val=ByteBuffer.zigZagDecode64(val);return val;};}
ByteBufferPrototype.writeCString=function(str,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;var i,k=str.length;if(!this.noAssert){if(typeof str!=='string')
throw TypeError("Illegal str: Not a string");for(i=0;i<k;++i){if(str.charCodeAt(i)===0)
throw RangeError("Illegal str: Contains NULL-characters");}
if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
k=utfx.calculateUTF16asUTF8(stringSource(str))[1];offset+=k+1;var capacity12=this.buffer.byteLength;if(offset>capacity12)
this.resize((capacity12*=2)>offset?capacity12:offset);offset-=k+1;utfx.encodeUTF16toUTF8(stringSource(str),function(b){this.view.setUint8(offset++,b);}.bind(this));this.view.setUint8(offset++,0);if(relative){this.offset=offset;return this;}
return k;};ByteBufferPrototype.readCString=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+1>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);}
var start=offset,temp;var sd,b=-1;utfx.decodeUTF8toUTF16(function(){if(b===0)return null;if(offset>=this.limit)
throw RangeError("Illegal range: Truncated data, "+offset+" < "+this.limit);return(b=this.view.getUint8(offset++))===0?null:b;}.bind(this),sd=stringDestination(),true);if(relative){this.offset=offset;return sd();}else{return{"string":sd(),"length":offset-start};}};ByteBufferPrototype.writeIString=function(str,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof str!=='string')
throw TypeError("Illegal str: Not a string");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
var start=offset,k;k=utfx.calculateUTF16asUTF8(stringSource(str),this.noAssert)[1];offset+=4+k;var capacity13=this.buffer.byteLength;if(offset>capacity13)
this.resize((capacity13*=2)>offset?capacity13:offset);offset-=4+k;this.view.setUint32(offset,k,this.littleEndian);offset+=4;utfx.encodeUTF16toUTF8(stringSource(str),function(b){this.view.setUint8(offset++,b);}.bind(this));if(offset!==start+4+k)
throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+4+k));if(relative){this.offset=offset;return this;}
return offset-start;};ByteBufferPrototype.readIString=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+4>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);}
var temp=0,start=offset,str;temp=this.view.getUint32(offset,this.littleEndian);offset+=4;var k=offset+temp,sd;utfx.decodeUTF8toUTF16(function(){return offset<k?this.view.getUint8(offset++):null;}.bind(this),sd=stringDestination(),this.noAssert);str=sd();if(relative){this.offset=offset;return str;}else{return{'string':str,'length':offset-start};}};ByteBuffer.METRICS_CHARS='c';ByteBuffer.METRICS_BYTES='b';ByteBufferPrototype.writeUTF8String=function(str,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
var k;var start=offset;k=utfx.calculateUTF16asUTF8(stringSource(str))[1];offset+=k;var capacity14=this.buffer.byteLength;if(offset>capacity14)
this.resize((capacity14*=2)>offset?capacity14:offset);offset-=k;utfx.encodeUTF16toUTF8(stringSource(str),function(b){this.view.setUint8(offset++,b);}.bind(this));if(relative){this.offset=offset;return this;}
return offset-start;};ByteBufferPrototype.writeString=ByteBufferPrototype.writeUTF8String;ByteBuffer.calculateUTF8Chars=function(str){return utfx.calculateUTF16asUTF8(stringSource(str))[0];};ByteBuffer.calculateUTF8Bytes=function(str){return utfx.calculateUTF16asUTF8(stringSource(str))[1];};ByteBufferPrototype.readUTF8String=function(length,metrics,offset){if(typeof metrics==='number'){offset=metrics;metrics=undefined;}
var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(typeof metrics==='undefined')metrics=ByteBuffer.METRICS_CHARS;if(!this.noAssert){if(typeof length!=='number'||length%1!==0)
throw TypeError("Illegal length: "+length+" (not an integer)");length|=0;if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
var i=0,start=offset,sd;if(metrics===ByteBuffer.METRICS_CHARS){sd=stringDestination();utfx.decodeUTF8(function(){return i<length&&offset<this.limit?this.view.getUint8(offset++):null;}.bind(this),function(cp){++i;utfx.UTF8toUTF16(cp,sd);}.bind(this));if(i!==length)
throw RangeError("Illegal range: Truncated data, "+i+" == "+length);if(relative){this.offset=offset;return sd();}else{return{"string":sd(),"length":offset-start};}}else if(metrics===ByteBuffer.METRICS_BYTES){if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+length>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.byteLength);}
var k=offset+length;utfx.decodeUTF8toUTF16(function(){return offset<k?this.view.getUint8(offset++):null;}.bind(this),sd=stringDestination(),this.noAssert);if(offset!==k)
throw RangeError("Illegal range: Truncated data, "+offset+" == "+k);if(relative){this.offset=offset;return sd();}else{return{'string':sd(),'length':offset-start};}}else
throw TypeError("Unsupported metrics: "+metrics);};ByteBufferPrototype.readString=ByteBufferPrototype.readUTF8String;ByteBufferPrototype.writeVString=function(str,offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof str!=='string')
throw TypeError("Illegal str: Not a string");if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
var start=offset,k,l;k=utfx.calculateUTF16asUTF8(stringSource(str),this.noAssert)[1];l=ByteBuffer.calculateVarint32(k);offset+=l+k;var capacity15=this.buffer.byteLength;if(offset>capacity15)
this.resize((capacity15*=2)>offset?capacity15:offset);offset-=l+k;offset+=this.writeVarint32(k,offset);utfx.encodeUTF16toUTF8(stringSource(str),function(b){this.view.setUint8(offset++,b);}.bind(this));if(offset!==start+k+l)
throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+k+l));if(relative){this.offset=offset;return this;}
return offset-start;};ByteBufferPrototype.readVString=function(offset){var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+1>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);}
var temp=this.readVarint32(offset),start=offset,str;offset+=temp['length'];temp=temp['value'];var k=offset+temp,sd=stringDestination();utfx.decodeUTF8toUTF16(function(){return offset<k?this.view.getUint8(offset++):null;}.bind(this),sd,this.noAssert);str=sd();if(relative){this.offset=offset;return str;}else{return{'string':str,'length':offset-start};}};ByteBufferPrototype.append=function(source,encoding,offset){if(typeof encoding==='number'||typeof encoding!=='string'){offset=encoding;encoding=undefined;}
var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
if(!(source instanceof ByteBuffer))
source=ByteBuffer.wrap(source,encoding);var length=source.limit-source.offset;if(length<=0)return this;offset+=length;var capacity16=this.buffer.byteLength;if(offset>capacity16)
this.resize((capacity16*=2)>offset?capacity16:offset);offset-=length;new Uint8Array(this.buffer,offset).set(new Uint8Array(source.buffer).subarray(source.offset,source.limit));source.offset+=length;if(relative)this.offset+=length;return this;};ByteBufferPrototype.appendTo=function(target,offset){target.append(this,offset);return this;};ByteBufferPrototype.assert=function(assert){this.noAssert=!assert;return this;};ByteBufferPrototype.capacity=function(){return this.buffer.byteLength;};ByteBufferPrototype.clear=function(){this.offset=0;this.limit=this.buffer.byteLength;this.markedOffset=-1;return this;};ByteBufferPrototype.clone=function(copy){var bb=new ByteBuffer(0,this.littleEndian,this.noAssert);if(copy){var buffer=new ArrayBuffer(this.buffer.byteLength);new Uint8Array(buffer).set(this.buffer);bb.buffer=buffer;bb.view=new DataView(buffer);}else{bb.buffer=this.buffer;bb.view=this.view;}
bb.offset=this.offset;bb.markedOffset=this.markedOffset;bb.limit=this.limit;return bb;};ByteBufferPrototype.compact=function(begin,end){if(typeof begin==='undefined')begin=this.offset;if(typeof end==='undefined')end=this.limit;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);}
if(begin===0&&end===this.buffer.byteLength)
return this;var len=end-begin;if(len===0){this.buffer=EMPTY_BUFFER;this.view=null;if(this.markedOffset>=0)this.markedOffset-=begin;this.offset=0;this.limit=0;return this;}
var buffer=new ArrayBuffer(len);new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(begin,end));this.buffer=buffer;this.view=new DataView(buffer);if(this.markedOffset>=0)this.markedOffset-=begin;this.offset=0;this.limit=len;return this;};ByteBufferPrototype.copy=function(begin,end){if(typeof begin==='undefined')begin=this.offset;if(typeof end==='undefined')end=this.limit;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);}
if(begin===end)
return new ByteBuffer(0,this.littleEndian,this.noAssert);var capacity=end-begin,bb=new ByteBuffer(capacity,this.littleEndian,this.noAssert);bb.offset=0;bb.limit=capacity;if(bb.markedOffset>=0)bb.markedOffset-=begin;this.copyTo(bb,0,begin,end);return bb;};ByteBufferPrototype.copyTo=function(target,targetOffset,sourceOffset,sourceLimit){var relative,targetRelative;if(!this.noAssert){if(!ByteBuffer.isByteBuffer(target))
throw TypeError("Illegal target: Not a ByteBuffer");}
targetOffset=(targetRelative=typeof targetOffset==='undefined')?target.offset:targetOffset|0;sourceOffset=(relative=typeof sourceOffset==='undefined')?this.offset:sourceOffset|0;sourceLimit=typeof sourceLimit==='undefined'?this.limit:sourceLimit|0;if(targetOffset<0||targetOffset>target.buffer.byteLength)
throw RangeError("Illegal target range: 0 <= "+targetOffset+" <= "+target.buffer.byteLength);if(sourceOffset<0||sourceLimit>this.buffer.byteLength)
throw RangeError("Illegal source range: 0 <= "+sourceOffset+" <= "+this.buffer.byteLength);var len=sourceLimit-sourceOffset;if(len===0)
return target;target.ensureCapacity(targetOffset+len);new Uint8Array(target.buffer).set(new Uint8Array(this.buffer).subarray(sourceOffset,sourceLimit),targetOffset);if(relative)this.offset+=len;if(targetRelative)target.offset+=len;return this;};ByteBufferPrototype.ensureCapacity=function(capacity){var current=this.buffer.byteLength;if(current<capacity)
return this.resize((current*=2)>capacity?current:capacity);return this;};ByteBufferPrototype.fill=function(value,begin,end){var relative=typeof begin==='undefined';if(relative)begin=this.offset;if(typeof value==='string'&&value.length>0)
value=value.charCodeAt(0);if(typeof begin==='undefined')begin=this.offset;if(typeof end==='undefined')end=this.limit;if(!this.noAssert){if(typeof value!=='number'||value%1!==0)
throw TypeError("Illegal value: "+value+" (not an integer)");value|=0;if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);}
if(begin>=end)
return this;while(begin<end)this.view.setUint8(begin++,value);if(relative)this.offset=begin;return this;};ByteBufferPrototype.flip=function(){this.limit=this.offset;this.offset=0;return this;};ByteBufferPrototype.mark=function(offset){offset=typeof offset==='undefined'?this.offset:offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
this.markedOffset=offset;return this;};ByteBufferPrototype.order=function(littleEndian){if(!this.noAssert){if(typeof littleEndian!=='boolean')
throw TypeError("Illegal littleEndian: Not a boolean");}
this.littleEndian=!!littleEndian;return this;};ByteBufferPrototype.LE=function(littleEndian){this.littleEndian=typeof littleEndian!=='undefined'?!!littleEndian:true;return this;};ByteBufferPrototype.BE=function(bigEndian){this.littleEndian=typeof bigEndian!=='undefined'?!bigEndian:false;return this;};ByteBufferPrototype.prepend=function(source,encoding,offset){if(typeof encoding==='number'||typeof encoding!=='string'){offset=encoding;encoding=undefined;}
var relative=typeof offset==='undefined';if(relative)offset=this.offset;if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: "+offset+" (not an integer)");offset>>>=0;if(offset<0||offset+0>this.buffer.byteLength)
throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);}
if(!(source instanceof ByteBuffer))
source=ByteBuffer.wrap(source,encoding);var len=source.limit-source.offset;if(len<=0)return this;var diff=len-offset;var arrayView;if(diff>0){var buffer=new ArrayBuffer(this.buffer.byteLength+diff);arrayView=new Uint8Array(buffer);arrayView.set(new Uint8Array(this.buffer).subarray(offset,this.buffer.byteLength),len);this.buffer=buffer;this.view=new DataView(buffer);this.offset+=diff;if(this.markedOffset>=0)this.markedOffset+=diff;this.limit+=diff;offset+=diff;}else{arrayView=new Uint8Array(this.buffer);}
arrayView.set(new Uint8Array(source.buffer).subarray(source.offset,source.limit),offset-len);source.offset=source.limit;if(relative)
this.offset-=len;return this;};ByteBufferPrototype.prependTo=function(target,offset){target.prepend(this,offset);return this;};ByteBufferPrototype.printDebug=function(out){if(typeof out!=='function')out=console.log.bind(console);out(this.toString()+"\n"+"-------------------------------------------------------------------\n"+
this.toDebug(true));};ByteBufferPrototype.remaining=function(){return this.limit-this.offset;};ByteBufferPrototype.reset=function(){if(this.markedOffset>=0){this.offset=this.markedOffset;this.markedOffset=-1;}else{this.offset=0;}
return this;};ByteBufferPrototype.resize=function(capacity){if(!this.noAssert){if(typeof capacity!=='number'||capacity%1!==0)
throw TypeError("Illegal capacity: "+capacity+" (not an integer)");capacity|=0;if(capacity<0)
throw RangeError("Illegal capacity: 0 <= "+capacity);}
if(this.buffer.byteLength<capacity){var buffer=new ArrayBuffer(capacity);new Uint8Array(buffer).set(new Uint8Array(this.buffer));this.buffer=buffer;this.view=new DataView(buffer);}
return this;};ByteBufferPrototype.reverse=function(begin,end){if(typeof begin==='undefined')begin=this.offset;if(typeof end==='undefined')end=this.limit;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);}
if(begin===end)
return this;Array.prototype.reverse.call(new Uint8Array(this.buffer).subarray(begin,end));this.view=new DataView(this.buffer);return this;};ByteBufferPrototype.skip=function(length){if(!this.noAssert){if(typeof length!=='number'||length%1!==0)
throw TypeError("Illegal length: "+length+" (not an integer)");length|=0;}
var offset=this.offset+length;if(!this.noAssert){if(offset<0||offset>this.buffer.byteLength)
throw RangeError("Illegal length: 0 <= "+this.offset+" + "+length+" <= "+this.buffer.byteLength);}
this.offset=offset;return this;};ByteBufferPrototype.slice=function(begin,end){if(typeof begin==='undefined')begin=this.offset;if(typeof end==='undefined')end=this.limit;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);}
var bb=this.clone();bb.offset=begin;bb.limit=end;return bb;};ByteBufferPrototype.toBuffer=function(forceCopy){var offset=this.offset,limit=this.limit;if(offset>limit){var t=offset;offset=limit;limit=t;}
if(!this.noAssert){if(typeof offset!=='number'||offset%1!==0)
throw TypeError("Illegal offset: Not an integer");offset>>>=0;if(typeof limit!=='number'||limit%1!==0)
throw TypeError("Illegal limit: Not an integer");limit>>>=0;if(offset<0||offset>limit||limit>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+offset+" <= "+limit+" <= "+this.buffer.byteLength);}
if(!forceCopy&&offset===0&&limit===this.buffer.byteLength){return this.buffer;}
if(offset===limit){return EMPTY_BUFFER;}
var buffer=new ArrayBuffer(limit-offset);new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(offset,limit),0);return buffer;};ByteBufferPrototype.toArrayBuffer=ByteBufferPrototype.toBuffer;ByteBufferPrototype.toString=function(encoding,begin,end){if(typeof encoding==='undefined')
return"ByteBufferAB(offset="+this.offset+",markedOffset="+this.markedOffset+",limit="+this.limit+",capacity="+this.capacity()+")";if(typeof encoding==='number')
encoding="utf8",begin=encoding,end=begin;switch(encoding){case"utf8":return this.toUTF8(begin,end);case"base64":return this.toBase64(begin,end);case"hex":return this.toHex(begin,end);case"binary":return this.toBinary(begin,end);case"debug":return this.toDebug();case"columns":return this.toColumns();default:throw Error("Unsupported encoding: "+encoding);}};var lxiv=function(){"use strict";var lxiv={};var aout=[65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,48,49,50,51,52,53,54,55,56,57,43,47];var ain=[];for(var i=0,k=aout.length;i<k;++i)
ain[aout[i]]=i;lxiv.encode=function(src,dst){var b,t;while((b=src())!==null){dst(aout[(b>>2)&0x3f]);t=(b&0x3)<<4;if((b=src())!==null){t|=(b>>4)&0xf;dst(aout[(t|((b>>4)&0xf))&0x3f]);t=(b&0xf)<<2;if((b=src())!==null)
dst(aout[(t|((b>>6)&0x3))&0x3f]),dst(aout[b&0x3f]);else
dst(aout[t&0x3f]),dst(61);}else
dst(aout[t&0x3f]),dst(61),dst(61);}};lxiv.decode=function(src,dst){var c,t1,t2;function fail(c){throw Error("Illegal character code: "+c);}
while((c=src())!==null){t1=ain[c];if(typeof t1==='undefined')fail(c);if((c=src())!==null){t2=ain[c];if(typeof t2==='undefined')fail(c);dst((t1<<2)>>>0|(t2&0x30)>>4);if((c=src())!==null){t1=ain[c];if(typeof t1==='undefined')
if(c===61)break;else fail(c);dst(((t2&0xf)<<4)>>>0|(t1&0x3c)>>2);if((c=src())!==null){t2=ain[c];if(typeof t2==='undefined')
if(c===61)break;else fail(c);dst(((t1&0x3)<<6)>>>0|t2);}}}}};lxiv.test=function(str){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);};return lxiv;}();ByteBufferPrototype.toBase64=function(begin,end){if(typeof begin==='undefined')
begin=this.offset;if(typeof end==='undefined')
end=this.limit;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);}
var sd;lxiv.encode(function(){return begin<end?this.view.getUint8(begin++):null;}.bind(this),sd=stringDestination());return sd();};ByteBuffer.fromBase64=function(str,littleEndian,noAssert){if(!noAssert){if(typeof str!=='string')
throw TypeError("Illegal str: Not a string");if(str.length%4!==0)
throw TypeError("Illegal str: Length not a multiple of 4");}
var bb=new ByteBuffer(str.length/4*3,littleEndian,noAssert),i=0;lxiv.decode(stringSource(str),function(b){bb.view.setUint8(i++,b);});bb.limit=i;return bb;};ByteBuffer.btoa=function(str){return ByteBuffer.fromBinary(str).toBase64();};ByteBuffer.atob=function(b64){return ByteBuffer.fromBase64(b64).toBinary();};ByteBufferPrototype.toBinary=function(begin,end){begin=typeof begin==='undefined'?this.offset:begin;end=typeof end==='undefined'?this.limit:end;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);}
if(begin===end)
return"";var cc=[],pt=[];while(begin<end){cc.push(this.view.getUint8(begin++));if(cc.length>=1024)
pt.push(String.fromCharCode.apply(String,cc)),cc=[];}
return pt.join('')+String.fromCharCode.apply(String,cc);};ByteBuffer.fromBinary=function(str,littleEndian,noAssert){if(!noAssert){if(typeof str!=='string')
throw TypeError("Illegal str: Not a string");}
var i=0,k=str.length,charCode,bb=new ByteBuffer(k,littleEndian,noAssert);while(i<k){charCode=str.charCodeAt(i);if(!noAssert&&charCode>255)
throw RangeError("Illegal charCode at "+i+": 0 <= "+charCode+" <= 255");bb.view.setUint8(i++,charCode);}
bb.limit=k;return bb;};ByteBufferPrototype.toDebug=function(columns){var i=-1,k=this.buffer.byteLength,b,hex="",asc="",out="";while(i<k){if(i!==-1){b=this.view.getUint8(i);if(b<0x10)hex+="0"+b.toString(16).toUpperCase();else hex+=b.toString(16).toUpperCase();if(columns){asc+=b>32&&b<127?String.fromCharCode(b):'.';}}
++i;if(columns){if(i>0&&i%16===0&&i!==k){while(hex.length<3*16+3)hex+=" ";out+=hex+asc+"\n";hex=asc="";}}
if(i===this.offset&&i===this.limit)
hex+=i===this.markedOffset?"!":"|";else if(i===this.offset)
hex+=i===this.markedOffset?"[":"<";else if(i===this.limit)
hex+=i===this.markedOffset?"]":">";else
hex+=i===this.markedOffset?"'":(columns||(i!==0&&i!==k)?" ":"");}
if(columns&&hex!==" "){while(hex.length<3*16+3)hex+=" ";out+=hex+asc+"\n";}
return columns?out:hex;};ByteBuffer.fromDebug=function(str,littleEndian,noAssert){var k=str.length,bb=new ByteBuffer(((k+1)/3)|0,littleEndian,noAssert);var i=0,j=0,ch,b,rs=false,ho=false,hm=false,hl=false,fail=false;while(i<k){switch(ch=str.charAt(i++)){case'!':if(!noAssert){if(ho||hm||hl){fail=true;break;}
ho=hm=hl=true;}
bb.offset=bb.markedOffset=bb.limit=j;rs=false;break;case'|':if(!noAssert){if(ho||hl){fail=true;break;}
ho=hl=true;}
bb.offset=bb.limit=j;rs=false;break;case'[':if(!noAssert){if(ho||hm){fail=true;break;}
ho=hm=true;}
bb.offset=bb.markedOffset=j;rs=false;break;case'<':if(!noAssert){if(ho){fail=true;break;}
ho=true;}
bb.offset=j;rs=false;break;case']':if(!noAssert){if(hl||hm){fail=true;break;}
hl=hm=true;}
bb.limit=bb.markedOffset=j;rs=false;break;case'>':if(!noAssert){if(hl){fail=true;break;}
hl=true;}
bb.limit=j;rs=false;break;case"'":if(!noAssert){if(hm){fail=true;break;}
hm=true;}
bb.markedOffset=j;rs=false;break;case' ':rs=false;break;default:if(!noAssert){if(rs){fail=true;break;}}
b=parseInt(ch+str.charAt(i++),16);if(!noAssert){if(isNaN(b)||b<0||b>255)
throw TypeError("Illegal str: Not a debug encoded string");}
bb.view.setUint8(j++,b);rs=true;}
if(fail)
throw TypeError("Illegal str: Invalid symbol at "+i);}
if(!noAssert){if(!ho||!hl)
throw TypeError("Illegal str: Missing offset or limit");if(j<bb.buffer.byteLength)
throw TypeError("Illegal str: Not a debug encoded string (is it hex?) "+j+" < "+k);}
return bb;};ByteBufferPrototype.toHex=function(begin,end){begin=typeof begin==='undefined'?this.offset:begin;end=typeof end==='undefined'?this.limit:end;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);}
var out=new Array(end-begin),b;while(begin<end){b=this.view.getUint8(begin++);if(b<0x10)
out.push("0",b.toString(16));else out.push(b.toString(16));}
return out.join('');};ByteBuffer.fromHex=function(str,littleEndian,noAssert){if(!noAssert){if(typeof str!=='string')
throw TypeError("Illegal str: Not a string");if(str.length%2!==0)
throw TypeError("Illegal str: Length not a multiple of 2");}
var k=str.length,bb=new ByteBuffer((k/2)|0,littleEndian),b;for(var i=0,j=0;i<k;i+=2){b=parseInt(str.substring(i,i+2),16);if(!noAssert)
if(!isFinite(b)||b<0||b>255)
throw TypeError("Illegal str: Contains non-hex characters");bb.view.setUint8(j++,b);}
bb.limit=j;return bb;};var utfx=function(){"use strict";var utfx={};utfx.MAX_CODEPOINT=0x10FFFF;utfx.encodeUTF8=function(src,dst){var cp=null;if(typeof src==='number')
cp=src,src=function(){return null;};while(cp!==null||(cp=src())!==null){if(cp<0x80)
dst(cp&0x7F);else if(cp<0x800)
dst(((cp>>6)&0x1F)|0xC0),dst((cp&0x3F)|0x80);else if(cp<0x10000)
dst(((cp>>12)&0x0F)|0xE0),dst(((cp>>6)&0x3F)|0x80),dst((cp&0x3F)|0x80);else
dst(((cp>>18)&0x07)|0xF0),dst(((cp>>12)&0x3F)|0x80),dst(((cp>>6)&0x3F)|0x80),dst((cp&0x3F)|0x80);cp=null;}};utfx.decodeUTF8=function(src,dst){var a,b,c,d,fail=function(b){b=b.slice(0,b.indexOf(null));var err=Error(b.toString());err.name="TruncatedError";err['bytes']=b;throw err;};while((a=src())!==null){if((a&0x80)===0)
dst(a);else if((a&0xE0)===0xC0)
((b=src())===null)&&fail([a,b]),dst(((a&0x1F)<<6)|(b&0x3F));else if((a&0xF0)===0xE0)
((b=src())===null||(c=src())===null)&&fail([a,b,c]),dst(((a&0x0F)<<12)|((b&0x3F)<<6)|(c&0x3F));else if((a&0xF8)===0xF0)
((b=src())===null||(c=src())===null||(d=src())===null)&&fail([a,b,c,d]),dst(((a&0x07)<<18)|((b&0x3F)<<12)|((c&0x3F)<<6)|(d&0x3F));else throw RangeError("Illegal starting byte: "+a);}};utfx.UTF16toUTF8=function(src,dst){var c1,c2=null;while(true){if((c1=c2!==null?c2:src())===null)
break;if(c1>=0xD800&&c1<=0xDFFF){if((c2=src())!==null){if(c2>=0xDC00&&c2<=0xDFFF){dst((c1-0xD800)*0x400+c2-0xDC00+0x10000);c2=null;continue;}}}
dst(c1);}
if(c2!==null)dst(c2);};utfx.UTF8toUTF16=function(src,dst){var cp=null;if(typeof src==='number')
cp=src,src=function(){return null;};while(cp!==null||(cp=src())!==null){if(cp<=0xFFFF)
dst(cp);else
cp-=0x10000,dst((cp>>10)+0xD800),dst((cp%0x400)+0xDC00);cp=null;}};utfx.encodeUTF16toUTF8=function(src,dst){utfx.UTF16toUTF8(src,function(cp){utfx.encodeUTF8(cp,dst);});};utfx.decodeUTF8toUTF16=function(src,dst){utfx.decodeUTF8(src,function(cp){utfx.UTF8toUTF16(cp,dst);});};utfx.calculateCodePoint=function(cp){return(cp<0x80)?1:(cp<0x800)?2:(cp<0x10000)?3:4;};utfx.calculateUTF8=function(src){var cp,l=0;while((cp=src())!==null)
l+=utfx.calculateCodePoint(cp);return l;};utfx.calculateUTF16asUTF8=function(src){var n=0,l=0;utfx.UTF16toUTF8(src,function(cp){++n;l+=utfx.calculateCodePoint(cp);});return[n,l];};return utfx;}();ByteBufferPrototype.toUTF8=function(begin,end){if(typeof begin==='undefined')begin=this.offset;if(typeof end==='undefined')end=this.limit;if(!this.noAssert){if(typeof begin!=='number'||begin%1!==0)
throw TypeError("Illegal begin: Not an integer");begin>>>=0;if(typeof end!=='number'||end%1!==0)
throw TypeError("Illegal end: Not an integer");end>>>=0;if(begin<0||begin>end||end>this.buffer.byteLength)
throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);}
var sd;try{utfx.decodeUTF8toUTF16(function(){return begin<end?this.view.getUint8(begin++):null;}.bind(this),sd=stringDestination());}catch(e){if(begin!==end)
throw RangeError("Illegal range: Truncated data, "+begin+" != "+end);}
return sd();};ByteBuffer.fromUTF8=function(str,littleEndian,noAssert){if(!noAssert)
if(typeof str!=='string')
throw TypeError("Illegal str: Not a string");var bb=new ByteBuffer(utfx.calculateUTF16asUTF8(stringSource(str),true)[1],littleEndian,noAssert),i=0;utfx.encodeUTF16toUTF8(stringSource(str),function(b){bb.view.setUint8(i++,b);});bb.limit=i;return bb;};return ByteBuffer;}
if(typeof require==='function'&&typeof module==='object'&&module&&typeof exports==='object'&&exports)
module['exports']=(function(){var Long;try{Long=require("long");}catch(e){}
return loadByteBuffer(Long);})();else if(typeof define==='function'&&define["amd"])
define("ByteBuffer",["Long"],function(Long){return loadByteBuffer(Long);});else
(global["dcodeIO"]=global["dcodeIO"]||{})["ByteBuffer"]=loadByteBuffer(global["dcodeIO"]["Long"]);})(this);