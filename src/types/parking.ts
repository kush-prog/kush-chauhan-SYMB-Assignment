// Parking Slot Data Model - Exact as per requirements
export interface ParkingSlot {
  slotNo: number;
  isCovered: boolean;
  isEVCharging: boolean;
  isOccupied: boolean;
}

// Result type for parking operations
export interface ParkingResult {
  success: boolean;
  message: string;
  slotNo?: number;
}
