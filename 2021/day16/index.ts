import { readInput } from "../../utils";

// Returns a binary string representation of a hex character
const hex2bin = (hex: string) => {
  return parseInt(hex, 16).toString(2).padStart(4, "0");
};

// Returns an integer representation of a bit string array
const bitArray2int = (bits: string[]) => {
  return parseInt(bits.join(""), 2);
};

type Packet = {
  version: number;
  typeId: number;
  value?: number;
  subPackets?: Packet[];
};

const parsePacket = (bits: string[]) => {
  const version = bitArray2int(bits.splice(0, 3));
  const packetTypeId = bitArray2int(bits.splice(0, 3));
  const packet: Packet = { version, typeId: packetTypeId };

  if (packetTypeId === 4) {
    // Literal value packet
    let wordsLeft = true;
    const literalValueBits: string[] = [];
    while (wordsLeft) {
      wordsLeft = bits.splice(0, 1)[0] === "1";
      literalValueBits.push(...bits.splice(0, 4));
    }
    packet.value = bitArray2int(literalValueBits);
  } else {
    // Operator packet
    packet.subPackets = [];
    const lengthType = bits.splice(0, 1)[0];
    if (lengthType === "0") {
      const subPacketLength = bitArray2int(bits.splice(0, 15));
      let remainingBits = bits.splice(0, subPacketLength);
      while (remainingBits.length) {
        let subPacket: Packet;
        ({ packet: subPacket, remainingBits } = parsePacket(remainingBits));
        packet.subPackets.push(subPacket);
      }
    } else {
      const subPacketCount = bitArray2int(bits.splice(0, 11));
      let remainingBits = bits;
      for (let i = 0; i < subPacketCount; i++) {
        let subPacket: Packet;
        ({ packet: subPacket, remainingBits } = parsePacket(remainingBits));
        packet.subPackets.push(subPacket);
      }
    }
  }
  return { packet, remainingBits: bits };
};

const packetVersionSum = (packet: Packet): number => {
  let versionSum = packet.version;
  if (packet.subPackets) {
    for (const subPacket of packet.subPackets) {
      versionSum += packetVersionSum(subPacket);
    }
  }
  return versionSum;
};

export const part1 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  let bits: string[] = input[0]
    .split("")
    .map((ch) => hex2bin(ch).split(""))
    .flat();

  const { packet } = parsePacket(bits);
  return packetVersionSum(packet).toString();
};

const packetValue = (packet: Packet): number => {
  if (packet.typeId === 4) {
    return packet.value!;
  }
  const subPackets = packet.subPackets!;
  let value = 0;
  if (packet.typeId === 0) {
    // Sum packet
    value = subPackets.map(packetValue).reduce((acc, cur) => acc + cur, 0);
  } else if (packet.typeId === 1) {
    // Product packet
    value = subPackets.map(packetValue).reduce((acc, cur) => acc * cur, 1);
  } else if (packet.typeId === 2) {
    // Min packet
    value = Math.min(...subPackets.map(packetValue));
  } else if (packet.typeId === 3) {
    // Max packet
    value = Math.max(...subPackets.map(packetValue));
  } else if (packet.typeId === 5) {
    // Greater than packet
    value = packetValue(subPackets[0]) > packetValue(subPackets[1]) ? 1 : 0;
  } else if (packet.typeId === 6) {
    // Less than packet
    value = packetValue(subPackets[0]) < packetValue(subPackets[1]) ? 1 : 0;
  } else if (packet.typeId === 7) {
    // Equal to packet
    value = packetValue(subPackets[0]) === packetValue(subPackets[1]) ? 1 : 0;
  }
  return value;
};

export const part2 = async (): Promise<string> => {
  const input = await readInput(__dirname);
  let bits: string[] = input[0]
    .split("")
    .map((ch) => hex2bin(ch).split(""))
    .flat();

  const { packet } = parsePacket(bits);
  return packetValue(packet).toString();
};
