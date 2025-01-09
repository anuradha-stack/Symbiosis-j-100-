package com.seat.seat_selection.repository;

import com.seat.seat_selection.entity.Seat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    // You can define custom queries here if needed

    // For example, to find seats by their status:
    List<Seat> findByStatus(String status);

}
