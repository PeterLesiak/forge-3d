import { Preprocessor } from '@forge-3d/core/Shaders';

const source = /* glsl */ `\
#version 300 es

#define float2 vec2
#define float3 vec3
#define float4 vec4
#define float4x4 mat4x4

precision highp float;

in float3 positon;
in float3 normal;
in float2 uv;

layout(std140) uniform __FORGE3D__MATERIAL__UBO
{
    float4x4 modelViewProjetion;
};

void main()
{
    gl_Position = modelViewProjetion * float4(position, 1.0);
}
`;

const preprocessor = new Preprocessor(source);

console.log(preprocessor.processed);
console.log(source);
