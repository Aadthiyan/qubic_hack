#pragma once
#include <stdint.h>
#include <cstring>

typedef uint8_t uint8;
typedef uint16_t uint16;
typedef uint32_t uint32;
typedef uint64_t uint64;

struct id {
    uint64 data[4];
    bool operator==(const id& other) const {
        return data[0] == other.data[0] && data[1] == other.data[1] &&
               data[2] == other.data[2] && data[3] == other.data[3];
    }
    bool operator!=(const id& other) const { return !(*this == other); }
};

struct QPI {
    id invocator() { return id(); }
    uint32 tick() { return 0; }
};

// Global QPI instance mock
QPI qpi;

// State mock (needs to be defined in the contract usually, but we need the keyword to be valid)
// In Qubic, 'state' is a global accessible in functions. 
// We will rely on the contract defining 'STATE state;' usually. 
// Ah, the contract defines 'struct STATE', but expects a global 'state' variable to exist.
// Let's modify the contract to instantiate it, or just header mock.

// Macros
#define INITIALIZE void initialize() 
#define PUBLIC_FUNCTION(name) void name(name##_input& input, name##_output& output)
