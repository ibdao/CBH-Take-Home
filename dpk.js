const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

	// Guard condition that returns '0' for no inputs
	if (!event) return TRIVIAL_PARTITION_KEY;

  const data = JSON.stringify(event);

	// Ternary conditional that assigns the conditional to the exisiting hash or creates a new has for the given input. 
	let candidate = (event.partitionKey) 
	? event.partitionKey 
	: crypto.createHash("sha3-512").update(data).digest("hex"); 

	// if the hash input is too long, rehash 
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};

