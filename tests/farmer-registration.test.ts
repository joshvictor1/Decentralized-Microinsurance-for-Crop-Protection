import { describe, it, expect, beforeEach } from "vitest"

// Mock implementation for testing Clarity contracts
// In a real environment, you would use a Clarity testing framework
const mockFarmerRegistration = {
  nextFarmerId: 0,
  farmers: new Map(),
  
  registerFarmer(name: string, location: string, farmSize: number, crops: string[]) {
    const farmerId = this.nextFarmerId
    this.nextFarmerId++
    
    this.farmers.set(farmerId, {
      name,
      location,
      farmSize,
      crops,
      registered: true,
    })
    
    return { success: true, value: farmerId }
  },
  
  getFarmer(farmerId: number) {
    return this.farmers.get(farmerId) || null
  },
  
  isRegistered(farmerId: number) {
    const farmer = this.farmers.get(farmerId)
    return farmer ? farmer.registered : false
  },
}

describe("Farmer Registration Contract", () => {
  beforeEach(() => {
    // Reset the mock state before each test
    mockFarmerRegistration.nextFarmerId = 0
    mockFarmerRegistration.farmers.clear()
  })
  
  it("should register a new farmer and return a farmer ID", () => {
    const result = mockFarmerRegistration.registerFarmer("John Doe", "tropical", 5, ["rice", "corn"])
    
    expect(result.success).toBe(true)
    expect(result.value).toBe(0) // First farmer should have ID 0
    
    const farmer = mockFarmerRegistration.getFarmer(0)
    expect(farmer).not.toBeNull()
    expect(farmer?.name).toBe("John Doe")
    expect(farmer?.location).toBe("tropical")
    expect(farmer?.farmSize).toBe(5)
    expect(farmer?.crops).toEqual(["rice", "corn"])
    expect(farmer?.registered).toBe(true)
  })
  
  it("should register multiple farmers with unique IDs", () => {
    const result1 = mockFarmerRegistration.registerFarmer("John Doe", "tropical", 5, ["rice", "corn"])
    
    const result2 = mockFarmerRegistration.registerFarmer("Jane Smith", "temperate", 8, ["wheat"])
    
    expect(result1.value).toBe(0)
    expect(result2.value).toBe(1)
    
    const farmer1 = mockFarmerRegistration.getFarmer(0)
    const farmer2 = mockFarmerRegistration.getFarmer(1)
    
    expect(farmer1?.name).toBe("John Doe")
    expect(farmer2?.name).toBe("Jane Smith")
  })
  
  it("should correctly check if a farmer is registered", () => {
    mockFarmerRegistration.registerFarmer("John Doe", "tropical", 5, ["rice", "corn"])
    
    expect(mockFarmerRegistration.isRegistered(0)).toBe(true)
    expect(mockFarmerRegistration.isRegistered(1)).toBe(false)
  })
  
  it("should return null for non-existent farmers", () => {
    expect(mockFarmerRegistration.getFarmer(999)).toBeNull()
  })
})

